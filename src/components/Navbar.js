import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";

export const Navbar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (error) {
      setError("Failed to Log Out!");
    }
  };

  return (
    <div className="navbar">
      <nav>
        <Link className="logo-link" to="/">
          <h1 className="logo">
            Digital CookBook <img src="/cookbook-logo.png" alt="logo" />
          </h1>
        </Link>
        <Link to="/add-recipe">Add new recipe</Link>
        <Link to="/recipes">Recipes</Link>
        {currentUser && <Link to="/update-profile">Profile</Link>}
        <strong>
          {currentUser && `Logged in as ${currentUser.email}`}
          <button onClick={handleLogOut}>
            {currentUser ? "Log Out" : "Log In"}
          </button>
        </strong>
      </nav>
    </div>
  );
};
