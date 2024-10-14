import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import SignUp from "../src/Components/SignUp/SignUp";
import Welcome from "../src/Components/Welcome/Welcome";
import Todo from "../src/Components/Todo/Todo";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
    });
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Welcome setUser={setUser} />} />
          <Route
            path="/todo"
            element={<Todo user={user} handleLogout={handleLogout} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
