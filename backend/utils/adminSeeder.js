const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const existing = await User.findOne({ email: adminEmail });
  if (existing) return;

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 10);
  await User.create({
    fullName: process.env.ADMIN_NAME || 'System Admin',
    email: adminEmail,
    password: passwordHash,
    height: 170,
    weight: 70,
    bmi: 24.22,
    sport: 'Administration',
    level: 'Amateur',
    goal: 'Physical Conditioning',
    subscriptionStatus: 'active',
    role: 'admin',
    weightHistory: [{ value: 70 }]
  });

  console.log('Admin user seeded');
};

module.exports = seedAdmin;
