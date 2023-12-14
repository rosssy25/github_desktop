// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Online Bookstore - Your Literary Haven!</h1>
        <Link to="/login" className="cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
