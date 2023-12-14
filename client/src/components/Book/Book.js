  // Book.js
  import { Button } from "@mui/material";
  import axios from "axios";
  import { Link, useNavigate } from "react-router-dom";
  import { useCart } from "../cartContext";
  import Modal from "./modal"; // Import your modal component
  import "./Book.css";
  import React from "react";

  const Book = (props) => {
    const history = useNavigate();
    const { _id, name, author, description, price, image } = props.book;
    const [modalOpen, setModalOpen] = React.useState(false);

    const { addToCart } = useCart();

    const deleteHandler = async () => {
      try {
        await axios.delete(`http://localhost:5000/books/${_id}`);
        // Reload the page after successful deletion
        window.location.reload();
      } catch (error) {
        console.error('Error deleting book:', error.response?.data?.error || error.message);
      }
    };
    

    const handleBuy = () => {
      const bookItem = {
        _id,
        name,
        author,
        description,
        price,
        image,
      };

      addToCart(bookItem);
      setModalOpen(true); // Open the modal
    };

    const handleBookClick = () => {
      // Pass location state to BookView
      history(`/bookView/`, {
        state: { books: props.book, selectedBook: props.book },
      });
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    return (
      <div className="card">
        <div onClick={handleBookClick}>
          <img src={image} alt={name} />
          <article>By {author}</article>
          <h3>{name}</h3>
          <p>{description}</p>
          <h3>₱ {price}</h3>
        </div>
        <Button component={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
          Update
        </Button>
        <Button onClick={handleBuy} sx={{ mt: "auto" }}>
          Buy
        </Button>
        <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
          Delete
        </Button>
        {modalOpen && (
          <Modal book={props.book} closeModal={closeModal} />
        )}
      </div>
    );
  };

  export default Book;
