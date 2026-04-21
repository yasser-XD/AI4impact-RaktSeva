import express from 'express';
import { handleBloodRequest, handleTwilioWebhook, resetDemoState, getSystemState } from './services/decisionEngine.js';
import { handleAiChat } from './services/ai.js';

const router = express.Router();

// State fetching for the client dashboard to see live ETA/matches
router.get('/state', getSystemState);

// Reset demo state
router.post('/reset', resetDemoState);

// Hospital creates an emergency request
router.post('/requests', handleBloodRequest);

// Twilio webhook for SMS responses (Donor answering "Yes")
router.post('/webhooks/twilio', handleTwilioWebhook);

// AI Copilot chat handler
router.post('/chat', handleAiChat);

export default router;
