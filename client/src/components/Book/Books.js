// Books.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import Header from "../Header";
import { CartProvider } from "../cartContext";
import { useNavigate } from "react-router-dom";
import BookView from "./BookView";

const URL = "http://localhost:5000/books";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Books = () => {
  const [books, setBooks] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    console.log(book);
    // Pass location state to BookView
    navigate(`/bookView/`, { state: { books: books, selectedBook: book } });
  };

  return (
    <CartProvider>
      <div>
        <Header />
        <div>
          {selectedBook ? (
            <BookView book={selectedBook} />
          ) : (
            <ul>
              {books &&
                books.map((book, i) => (
                  <li key={i}>
                    <Book book={book} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </CartProvider>
  );
};

export default Books;
