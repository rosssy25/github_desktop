// CheckoutForm.js
import React, { useState } from "react";
import { Button, FormControl, InputLabel, Input, Select, MenuItem, TextField } from "@mui/material";

const CheckoutForm = ({ closeModal }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod, // Include the paymentMethod field
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
        }),
      });
      console.log(paymentMethod, firstName, lastName, email, phoneNumber, address)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Assuming your server returns a success message
      console.log("Checkout successful:", data);
      setResponseMessage(data.message); // Set the response message
      // Close the modal after successful submission
      setTimeout(() => {
        closeModal();
      }, 3000); // Close modal after 10 seconds
    } catch (error) {
      // Handle errors, show an alert, or update the UI accordingly
      console.error("Error during checkout:", error.message);
      setResponseMessage("Error during checkout. Please try again.");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Checkout</h2>
        <form>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="payment-method">Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              input={<Input id="payment-method" />}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="credit-card">Credit Card</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </form>
        {responseMessage && (
          <div style={{ marginTop: 10, color: responseMessage.includes("Error") ? "red" : "green" }}>
            {responseMessage}
          </div>
        )}
        <Button onClick={closeModal} sx={{ marginTop: 2 }}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
