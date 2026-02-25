const User = require('../models/User');

const getAdminMetrics = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    const activeSubscribers = users.filter((user) => user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing').length;

    return res.json({
      totalUsers: users.length,
      estimatedMonthlyRevenue: activeSubscribers * 19.9,
      users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminMetrics };
