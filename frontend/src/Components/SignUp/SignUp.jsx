import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      // Redirect to login after successful registration
      navigate('/login');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Registration failed. Please try again.'); // Show error message
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
          <label>UserName</label>
          <input
            name="username"
            type="text"
            placeholder="Enter UserName" 
            required
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="mail@example.com"
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label>Password</label>
          <input
            name="password"
            type="password" // Set type to password for security
            placeholder="Enter your password"
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login" className="link">Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;
