require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Member');

const mockMembers = [
  {
    name: 'Alexander Wright',
    email: 'alexander.wright@example.com',
    membershipType: 'VIP',
    status: 'Active',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  {
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    membershipType: 'Premium',
    status: 'Active',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    membershipType: 'Free',
    status: 'Pending',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Sophia Patel',
    email: 'sophia.patel@example.com',
    membershipType: 'VIP',
    status: 'Active',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Liam Johnson',
    email: 'liam.j@example.com',
    membershipType: 'Premium',
    status: 'Inactive',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Emma Watson',
    email: 'emma.watson@example.com',
    membershipType: 'Free',
    status: 'Active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'David Kim',
    email: 'david.kim@example.com',
    membershipType: 'Premium',
    status: 'Active',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Isabella Ross',
    email: 'isabella.ross@example.com',
    membershipType: 'VIP',
    status: 'Pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Lucas Silva',
    email: 'lucas.silva@example.com',
    membershipType: 'Free',
    status: 'Active',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  },
  {
    name: 'Mia Anderson',
    email: 'mia.a@example.com',
    membershipType: 'Premium',
    status: 'Active',
    createdAt: new Date() // Today
  }
];

const seedData = async () => {
  try {
    let connStr = process.env.MONGO_URI;
    if (!connStr || connStr.includes('xxxxx')) {
      console.log('WARNING: MONGO_URI is missing or is placeholder. Falling back to local MongoDB.');
      connStr = 'mongodb://127.0.0.1:27017/membership_db';
    }

    await mongoose.connect(connStr);
    console.log('Connected to MongoDB Atlas for seeding...');

    await Member.deleteMany();
    console.log('Cleared existing members.');

    const createdMembers = await Member.insertMany(mockMembers);
    console.log(`Seeded ${createdMembers.length} members successfully.`);

    mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
