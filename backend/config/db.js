const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let connStr = process.env.MONGO_URI;
    if (!connStr || connStr.includes('xxxxx')) {
      console.log('WARNING: MONGO_URI is missing or is placeholder. Falling back to local MongoDB.');
      connStr = 'mongodb://127.0.0.1:27017/membership_db';
    }
    
    const conn = await mongoose.connect(connStr);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
