const express = require('express');
const { createCheckoutSession, stripeWebhook } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
