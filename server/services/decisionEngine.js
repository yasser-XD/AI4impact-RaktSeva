import twilio from 'twilio';
import { db, seedDatabase, calculateDistance } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

// Twilio Setup (mocked if keys not provided)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// Hardcoded explicit routing for demo
const DEMO_PHONE_NUMBER = '+918790268186';
const TWILIO_FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

// Real-time state
export const getSystemState = (req, res) => {
  res.json({
    hospitals: db.hospitals,
    entities: db.entities,
    activeRequests: db.activeRequests
  });
};

export const resetDemoState = (req, res) => {
  seedDatabase();
  db.activeRequests = [];
  res.json({ message: 'Demo state reset' });
};

// Start routing logic
export const handleBloodRequest = async (req, res) => {
  const { hospitalId, bloodGroup, urgency } = req.body;
  
  const hospital = db.hospitals.find(h => h.id === hospitalId) || db.hospitals[0];
  
  const newRequest = {
    id: `req_${Date.now()}`,
    hospitalId: hospital.id,
    hospitalName: hospital.name,
    hospitalLat: hospital.lat,
    hospitalLon: hospital.lon,
    bloodGroup,
    urgency,
    status: 'FINDING_DONORS', // FINDING_DONORS, WAITING_FOR_REPLY, MATCHED
    logs: [],
    matchedDonor: null,
    etaMins: null
  };

  db.activeRequests.push(newRequest);
  newRequest.logs.push(`[Tier 1] Checking NGOs for blood packet inventory...`);
  newRequest.logs.push(`[Tier 1] NGOs bypassed (demo assumption: out of stock). Moving to Tier 2.`);

  // Tier 2: Nearest 5 available individual donors
  const individuals = db.entities.filter(e => e.type === 'Individual');
  
  const distances = individuals.map(donor => ({
    ...donor,
    distanceKm: calculateDistance(hospital.lat, hospital.lon, donor.lat, donor.lon)
  }));

  // Sort by nearest, slice top 5
  distances.sort((a, b) => a.distanceKm - b.distanceKm);
  const nearest5 = distances.slice(0, 5);
  
  newRequest.logs.push(`[Tier 2] Found ${nearest5.length} nearest donors using Haversine algorithm.`);

  // Rank by reliability (simulated AI)
  nearest5.sort((a, b) => b.reliability_score - a.reliability_score);
  
  newRequest.logs.push(`[Tier 2] Ranked top donors by Reliability Score. Top donor: ${nearest5[0].name} (Score: ${nearest5[0].reliability_score})`);

  // Target the best donor, but override phone for SMS delivery directly to demo phone
  const topDonor = nearest5[0];
  newRequest.targetDonor = topDonor; // Save in state to connect them upon YES reply
  newRequest.status = 'WAITING_FOR_REPLY';

  const messageBody = `EMERGENCY ALERT: ${hospital.name} needs ${bloodGroup} blood immediately. Reply YES to accept and reveal locations. Reply NO to decline.`;
  
  if (urgency?.trim() === 'CRITICAL') {
    newRequest.logs.push(`[Tier 3] CRITICAL URGENCY: Triggering Automated Voice Call to Demo Number: ${DEMO_PHONE_NUMBER}`);
    try {
      if (twilioClient) {
        const twiml = `<Response><Pause length="1"/><Say>Emergency alert from RaktSeva. ${hospital.name} requires ${bloodGroup} blood immediately. Check your dashboard. Goodbye.</Say></Response>`;
        await twilioClient.calls.create({
          twiml: twiml,
          from: TWILIO_FROM_NUMBER,
          to: DEMO_PHONE_NUMBER
        });
        newRequest.logs.push(`[VOICE] Automated emergency call dispatched successfully to ${DEMO_PHONE_NUMBER}`);
      } else {
        console.log(`[MOCK CALL] To: ${DEMO_PHONE_NUMBER}`);
        newRequest.logs.push(`[VOICE] Mock voice call triggered (No Twilio keys found).`);
      }
    } catch (error) {
      console.error('Twilio Call Error:', error);
      newRequest.logs.push(`[VOICE] Call failed: ${error.message}`);
    }
  } else {
    const notificationType = (urgency === 'URGENT') ? 'URGENT' : 'NORMAL';
    newRequest.logs.push(`[Tier 3] ${notificationType} NOTIFICATION: Dispatching SMS targeted for ${topDonor.name} directly to Demo Number: ${DEMO_PHONE_NUMBER}`);
    try {
      if (twilioClient) {
        await twilioClient.messages.create({
          body: messageBody,
          from: TWILIO_FROM_NUMBER,
          to: DEMO_PHONE_NUMBER
        });
        newRequest.logs.push(`[SMS] Twilio message sent successfully to ${DEMO_PHONE_NUMBER}`);
      } else {
        console.log(`[MOCK SMS] To: ${DEMO_PHONE_NUMBER}\nBody: ${messageBody}`);
        newRequest.logs.push(`[SMS] Mock message triggered (No Twilio keys found).`);
      }
    } catch (error) {
      console.error('Twilio Error:', error);
      newRequest.logs.push(`[SMS] Failed to send Twilio message. Proceeding in mock mode.`);
    }
  }

  res.json({ success: true, request: newRequest });

  // Auto-accept mock behavior for zero-friction demo 
  // Wait 10 seconds, then randomly print location/ETA 
  setTimeout(() => {
    if (newRequest.status === 'WAITING_FOR_REPLY') {
      newRequest.status = 'MATCHED';
      newRequest.matchedDonor = newRequest.targetDonor;
      
      const distanceKm = newRequest.targetDonor.distanceKm;
      // Add variable randomized traffic delay up to 15 mins to make every run unique
      const randomTrafficOffset = Math.floor(Math.random() * 15) + 3;
      const hours = distanceKm / 30;
      const mins = Math.max(5, Math.ceil(hours * 60)) + randomTrafficOffset;
      
      newRequest.etaMins = mins;
      newRequest.logs.push(`[System] Simulating donor automatically syncing after 10s delay...`);
      newRequest.logs.push(`[Match] Location revealed to both parties.`);
      newRequest.logs.push(`[ETA] Initialized Live ETA: ~${mins} minutes based on ${distanceKm.toFixed(2)}km distance.`);
    }
  }, 10000);
};
// Handle reply from Twilio 
export const handleTwilioWebhook = (req, res) => {
  // Twilio sends urlencoded data: Body, From, etc.
  const body = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
  const fromNumber = req.body.From;

  console.log(`[Webhook] Received SMS from ${fromNumber}: ${body}`);

  // Find the active request waiting for reply
  const request = db.activeRequests.find(r => r.status === 'WAITING_FOR_REPLY');

  if (request && body.includes('yes')) {
    request.status = 'MATCHED';
    request.matchedDonor = request.targetDonor;
    
    // Calculate ETA: Assume dense city traffic, Avg speed 30km/h
    // time = distance / speed
    const distanceKm = request.targetDonor.distanceKm;
    const randomTrafficOffset = Math.floor(Math.random() * 15) + 3;
    const hours = distanceKm / 30;
    const mins = Math.max(5, Math.ceil(hours * 60)) + randomTrafficOffset; // Minimum 5 mins ETA + traffic offset
    
    request.etaMins = mins;
    request.logs.push(`[Match] Donor replied YES! Location revealed.`);
    request.logs.push(`[ETA] Initialized Live ETA: ~${mins} minutes based on ${distanceKm.toFixed(2)}km distance.`);

    // Reply back via Twilio
    const replyMsg = `Thank you! Head to ${request.hospitalName}. ETA initialized at ${mins} mins. Map unlocked on your dashboard.`;
    res.setHeader('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${replyMsg}</Message></Response>`);
  } else {
    // Acknowledge, maybe fallback to next donor
    res.setHeader('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Acknowledged.</Message></Response>`);
  }
};
