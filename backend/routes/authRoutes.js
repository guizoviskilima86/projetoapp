const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullName').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('height').isFloat({ min: 100, max: 250 }),
    body('weight').isFloat({ min: 30, max: 300 }),
    body('sport').notEmpty(),
    body('level').isIn(['Amateur', 'HighPerformance']),
    body('goal').isIn(['Physical Conditioning', 'Muscle Gain', 'Weight Loss', 'Bodybuilding Preparation', 'Sport Performance'])
  ],
  validate,
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);

module.exports = router;
