// checkoutController.js

const Checkout = require('../model/checkoutModel');

// Handle the creation of checkout details
exports.createCheckout = async (req, res) => {
  try {
    const {
      paymentMethod,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      // Add other fields if needed
    } = req.body;

    // Create a new instance of the Checkout model
    const newCheckout = new Checkout({
      paymentMethod,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      // Assign other fields if needed
    });

    // Save the checkout details to the database
    await newCheckout.save();

    res.status(201).json({ message: 'Checkout details saved successfully' });
  } catch (error) {
    console.error('Error creating checkout details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
