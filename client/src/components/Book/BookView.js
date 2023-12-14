// BookView.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BookView.css';

const BookView = () => {
  const location = useLocation();
  const { selectedBook } = location.state || {};

  const [rating, setRating] = useState(() => {
    // Retrieve the rating from local storage or set a default value
    return parseInt(localStorage.getItem(`${selectedBook._id}-rating`) || 0, 10);
  });

  const [review, setReview] = useState(() => {
    // Retrieve the review from local storage or set a default value
    return localStorage.getItem(`${selectedBook._id}-review`) || '';
  });

  const [otherReviews, setOtherReviews] = useState(() => {
    // Retrieve other reviews from local storage or set a default value
    return JSON.parse(localStorage.getItem(`${selectedBook._id}-otherReviews`)) || [];
  });

  useEffect(() => {
    // Update local storage when the rating or review changes
    localStorage.setItem(`${selectedBook._id}-rating`, rating.toString());
    localStorage.setItem(`${selectedBook._id}-review`, review);
    localStorage.setItem(`${selectedBook._id}-otherReviews`, JSON.stringify(otherReviews));
  }, [rating, review, otherReviews, selectedBook._id]);

  const handleReviewSubmit = () => {
    // Handle submission logic
    const newReview = { rating, review };
    setOtherReviews([...otherReviews, newReview]);
    localStorage.setItem(`${selectedBook._id}-otherReviews`, JSON.stringify([...otherReviews, newReview]));

    // Clear the current review input fields
    setRating(0);
    setReview('');
  };
  const handleRatingClick = (clickedStar) => {
    setRating(clickedStar);
  };


  const handleReviewDelete = (index) => {
    // Handle deletion logic
    const updatedReviews = [...otherReviews];
    updatedReviews.splice(index, 1);
    setOtherReviews(updatedReviews);
    localStorage.setItem(`${selectedBook._id}-otherReviews`, JSON.stringify(updatedReviews));
  };

  if (!selectedBook) {
    return <div>Loading...</div>;
  }

  const { _id, name, author, description, price, image } = selectedBook;

  return (
    <div className="book-view-container">
    <div className="book-details-container">
      <h2>{name}</h2>
      <p>Author: {author}</p>
      <p>Description: {description}</p>
      <p>Price: ₱ {price}</p>
      <p>Book ID: {_id}</p>
      <img src={image} alt={name} />

      <div className="rating-container-box">
        <div className="rating-container">
          <p>Your Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`star ${star <= rating ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="review-container-box">
        <div className="review-container">
          <p>Your Review:</p>
          <textarea
            rows="4"
            cols="50"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      </div>

      <div className="other-reviews-container">
        <p>Other Reviews:</p>
        {otherReviews.map((otherReview, index) => (
          <div key={index}>
            <p>Rating: {otherReview.rating}</p>
            <p>Review: {otherReview.review}</p>
            <button onClick={() => handleReviewDelete(index)}>Delete Review</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default BookView;
