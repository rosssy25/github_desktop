// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        username,
        password,
        email,
      });
  
      if (response && response.data) {
        // Assuming the server sends a success message upon successful registration
        const message = response.data.message;
        console.log(message);
  
        // Set the success message state
        setSuccessMessage(message);
  
        // Redirect to login page after 10 seconds
        setTimeout(() => {
          history('/login');
        }, 3000);
      } else {
        console.error('Invalid response format:', response);
        // Handle unexpected response format
        setErrorMessage('Invalid response format');
      }
    } catch (error) {
      console.error('Error registering:', error.response?.data?.error || error.message);
      // Handle registration error, show an alert, or update the UI accordingly
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Register</h2>

        <div className="register-message-container">
          {successMessage && (
            <p className="success-message">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="error-message">
              {errorMessage}
            </p>
          )}
        </div>

        <form className="login-fields">
          <label className="login-label">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <button type="button" onClick={handleRegister} className="login-button">
            Register
          </button>
        </form>
        <p className="login-message">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>.
          
        </p>
      </div>
    </div>
  );
};

export default Register;
