import React, { useState } from "react";
import "./Welcome.css";
import { useNavigate } from 'react-router-dom';

const Welcome = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          setUser(data.username);

          navigate('/todo');
      } else {
          // Handle error
          navigate('/signup');
      }
  };

  return (
    <div className="welcome">
      <div className="welcome-container">
        <h1>
          Welcome to the Todo App
        </h1>
        <p>
          This app helps you manage your tasks easily. You can add, edit, and delete tasks to stay organized.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="mail@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="links">
          <a href="/forgot-password" className="link">Forgot Password?</a>
          <p>Don't have an account? <a href="/signup" className="link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
