  // Login.js
  import './login.css';
  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate, Link } from 'react-router-dom';

  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
      } catch (error) {
        console.error('Error logging in:', error.response.data.error);
        // Handle login error, show an alert, or update the UI accordingly
      }
    };

    return (
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-heading">Login</h2>
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
            <button type="button" onClick={handleLogin} className="login-button">
              Login
            </button>
          </form>
          <p className="login-message">
            Don't have an account? <Link to="/register" className="login-link">Register here</Link>.
          </p>
        </div>
      </div>
    );
  };

  export default Login;
