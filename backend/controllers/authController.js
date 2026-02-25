const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const calculateBmi = require('../utils/calculateBmi');
const generateDiet = require('../services/generateDiet');
const generateWorkout = require('../services/generateWorkout');
const generateSleepSchedule = require('../services/generateSleepSchedule');

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const existing = await User.findOne({ email: payload.email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const bmi = calculateBmi(payload.weight, payload.height);

    const userData = {
      ...payload,
      password: hashedPassword,
      bmi,
      weightHistory: [{ value: payload.weight }],
      subscriptionStatus: 'inactive'
    };

    const user = new User(userData);
    user.dietPlan = generateDiet(user);
    user.workoutPlan = generateWorkout(user);
    user.sleepSchedule = generateSleepSchedule(user);
    await user.save();

    return res.status(201).json({
      message: 'Registration successful',
      token: generateToken(user._id),
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
