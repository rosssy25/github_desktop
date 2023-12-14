// user.js

const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // You can add more fields as needed for your application
  // For example: name, age, role, etc.
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
