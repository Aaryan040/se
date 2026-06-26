const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  membershipType: {
    type: String,
    required: [true, 'Please specify a membership type'],
    enum: {
      values: ['Free', 'Premium', 'VIP'],
      message: 'Membership type must be Free, Premium, or VIP'
    }
  },
  status: {
    type: String,
    required: [true, 'Please specify a status'],
    enum: {
      values: ['Active', 'Pending', 'Inactive'],
      message: 'Status must be Active, Pending, or Inactive'
    },
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', MemberSchema);
