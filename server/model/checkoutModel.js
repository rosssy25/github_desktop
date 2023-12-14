// Create a file named 'checkoutModel.js' or something similar

const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // You can add other fields as needed for your application
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
