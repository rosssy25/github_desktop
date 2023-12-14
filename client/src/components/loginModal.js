// LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginModal = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      // Assuming the server sends a token upon successful login
      const token = response.data.token;

      // Save the token in localStorage or sessionStorage for further use
      localStorage.setItem('token', token);

      // Redirect to /home after successful login
      history('/home');
      closeModal(); // Close the modal after successful login
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.error);
      // Handle login error, show an alert, or update the UI accordingly
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
