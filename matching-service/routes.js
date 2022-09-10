const express = require('express');
const router = express.Router();
const matching = require('./controllers/MatchingController');

// GET endpoints
router.get('/status', matching.serviceHealthCheck);
router.get('/interviews', matching.interviewsCount);
router.get('/get_interview', matching.getInterview);

// POST endpoints
router.post('/find_match', matching.searchMatch);

// DELETE endpoints
router.delete('/stop_find', matching.cancelFindMatch);
router.delete('/end_interview', matching.endInterview);

// Export API routes
module.exports = router;