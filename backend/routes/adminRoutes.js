const express = require('express');
const { getAdminMetrics } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, adminOnly, getAdminMetrics);

module.exports = router;
