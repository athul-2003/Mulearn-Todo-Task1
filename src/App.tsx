// App.tsx

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import TodoApp from "./components/TodoApp";
import { User } from "./components/types";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const handleSignup = (user: User) => {
    setUsers([...users, user]);
    localStorage.setItem("users", JSON.stringify([...users, user]));
    alert("User signed up successfully!");
    setShowSignup(false); // Hide the signup form after signup
  };

  const handleLogin = (credentials: User) => {
    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = storedUsers.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (foundUser) {
      setLoggedInUser(foundUser);
      alert("Login successful!");
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup); // Toggle the display of signup form
  };

  return (
    <div>
      {!loggedInUser && !showSignup ? (
        <LoginForm handleLogin={handleLogin} toggleSignup={toggleSignup} />
      ) : null}
      {!loggedInUser && showSignup ? (
        <SignupForm handleSignup={handleSignup} />
      ) : null}
      {loggedInUser && (
        <header>
          <div className="header-content">
            <h1>
              <FaUserCircle /> Welcome, {loggedInUser.username}!
            </h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </header>
      )}
      {loggedInUser && <TodoApp />}
    </div>
  );
};

export default App;
