import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/user-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.username); // Set the user state
      // Redirect to the Todo page after successful login
      navigate('/todo');
      // Clear inputs on successful login
      setEmail('');
      setPassword('');
      setError(''); // Clear any previous error messages
    } else {
      const errorData = await response.json();
      // Set error message to state
      setError(errorData.message || 'Login failed');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="mail@example.com"
            autoComplete="off" 
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label>Password</label>
          <input
            name="password"
            type="password" // Ensure the password is hidden
            placeholder="Enter your password"
            autoComplete="off" 
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
          <button className="login-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup" className="link">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
