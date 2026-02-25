const express = require('express');
const { body } = require('express-validator');
const { getDashboard, updateWeight, updateProfile } = require('../controllers/userController');
const { protect, requireActiveSubscription } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/dashboard', protect, requireActiveSubscription, getDashboard);
router.patch('/weight', protect, [body('weight').isFloat({ min: 30, max: 300 })], validate, updateWeight);
router.patch('/profile', protect, updateProfile);

module.exports = router;
