const jwt = require('jsonwebtoken');

const generateToken = (userId, role = 'user') => jwt.sign(
  { userId, role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
);

module.exports = generateToken;
