// Modal.js
import React, { useState } from "react";
import { Button } from "@mui/material";
import CheckoutForm from "./CheckoutForm"; // Import the CheckoutForm component
import "./Modal.css"; // Add your modal styles here

const Modal = ({ book, closeModal }) => {
  const { name, author, description, price, image } = book;
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBuyClick = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{name}</h2>
        <p>Author: {author}</p>
        <p>Description: {description}</p>
        <p>Price: ₱ {price}</p>
        <img src={image} alt={name} />

        <Button onClick={handleBuyClick}>Buy</Button>
        <Button onClick={closeModal}>Close</Button>

        {showCheckout && <CheckoutForm closeModal={closeCheckout} />}
      </div>
    </div>
  );
};

export default Modal;
