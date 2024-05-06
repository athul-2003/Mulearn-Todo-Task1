// LoginForm.tsx

import React, { useState } from "react";
import { User } from "./types";
import "../forms.css";

interface LoginFormProps {
  handleLogin: (credentials: User) => void;
  toggleSignup: () => void; // Function to toggle to signup form
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin, toggleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div className="box">
    <form onSubmit={handleSubmit}>
      <div className="form-container">
      <h2>🔑 User Login</h2>
        <div className="inner-box">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <span style={{ marginLeft: "10px" }}>
        Don't have an account?{" "}
        <button type="button" onClick={toggleSignup}>
          Sign Up
        </button>
      </span></div></div>
    </form></div>
  );
};

export default LoginForm;
