import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Login from "./components/login";
import Register from "./components/register";
import LandingPage from "./components/landingpage";
import BookView from "./components/Book/BookView";

function App() {
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/bookView" element={<BookView />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
