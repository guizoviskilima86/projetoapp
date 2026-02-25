const User = require('../models/User');
const calculateBmi = require('../utils/calculateBmi');

const getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateWeight = async (req, res, next) => {
  try {
    const { weight } = req.body;
    const user = await User.findById(req.user._id);
    user.weight = Number(weight);
    user.bmi = calculateBmi(user.weight, user.height);
    user.weightHistory.push({ value: user.weight });
    await user.save();
    return res.json({ message: 'Weight updated', weight: user.weight, bmi: user.bmi, weightHistory: user.weightHistory });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['fullName', 'sport', 'profession', 'workStart', 'workEnd', 'breakIntervals'];
    const user = await User.findById(req.user._id);
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) user[field] = req.body[field];
    });
    await user.save();
    return res.json({ message: 'Profile updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, updateWeight, updateProfile };
