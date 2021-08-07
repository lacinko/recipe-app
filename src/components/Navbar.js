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
          <h1 className="navbar__logo-text">
            Digital <br /> <b>Cook</b>Book
            <img src="/cookbook-logo.png" alt="logo" />
          </h1>
        </Link>
        <Link className="navbar__link" to="/add-recipe">
          Add new recipe
        </Link>
        <Link className="navbar__link" to="/recipes">
          Recipes
        </Link>
        {currentUser && (
          <Link className="navbar__link" to="/update-profile">
            Profile
          </Link>
        )}
        <strong>
          {currentUser && `Logged in as ${currentUser.email}`}
          <button className="navbar__login-btn" onClick={handleLogOut}>
            {currentUser ? "Log Out" : "Log In"}
          </button>
        </strong>
        <div className="navbar__img-container">
          <img
            src="https://images.pexels.com/photos/4518688/pexels-photo-4518688.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="navbar-image-dish"
          />
        </div>
      </nav>
    </div>
  );
};
