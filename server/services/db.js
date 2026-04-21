// In-memory mock database for the zero-friction interactive demo
// Randomly seeds data every time the server starts.

// Haversine distance helper for seeding and logic
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Hospital coordinate (e.g., center of a city, say Hyderabad for demo)
const BASE_LAT = 17.3850;
const BASE_LON = 78.4867;

export const db = {
  hospitals: [
    { id: 'h1', name: 'Apollo Hospitals', lat: BASE_LAT, lon: BASE_LON }
  ],
  entities: [], // NGOs and Donors
  activeRequests: []
};

// Seed the database
export const seedDatabase = () => {
  db.entities = [];
  
  // 3-4 NGOs
  for (let i = 1; i <= 3; i++) {
    db.entities.push({
      id: `ngo_${i}`,
      type: 'NGO',
      name: `LifeBlood NGO ${i}`,
      blood_group: 'O+',
      lat: BASE_LAT + (Math.random() - 0.5) * 0.1,
      lon: BASE_LON + (Math.random() - 0.5) * 0.1,
      reliability_score: 100, // NGOs are always reliable
      hasStock: false // As per plan: assume NGOs lack stock for demo
    });
  }

  // 10 Individual Donors
  for (let i = 1; i <= 10; i++) {
    db.entities.push({
      id: `donor_${i}`,
      type: 'Individual',
      name: `Random Donor ${i}`,
      blood_group: 'O+',
      phone: `+9199999999${i < 10 ? '0' + i : i}`, // Fake numbers, but we will route SMS to hardcoded demo number
      lat: BASE_LAT + (Math.random() - 0.5) * 0.1, // Randomly spread around hospital
      lon: BASE_LON + (Math.random() - 0.5) * 0.1,
      reliability_score: Math.floor(Math.random() * 100), // Random 0-100 score
      hasStock: true 
    });
  }

  console.log('[DB] Seeded database with mock NGOs and Individual Donors.');
};

// Initialize seed
seedDatabase();
