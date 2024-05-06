import React, { useState } from "react";
import { User } from "./types";
import "../forms.css";

interface SignupFormProps {
  handleSignup: (user: User) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // New state for email

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup({ username, password, email }); // Include email in the signup data
    setUsername("");
    setPassword("");
    setEmail(""); // Clear email field after submission
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h2>👤➕ Sign Up</h2>
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
            <div> {/* Add the email input field */}
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
