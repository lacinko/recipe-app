import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <h1>
          Digital CookBook <img src="/cookbook-logo.png" alt="logo" />
        </h1>
        <Link to="/add-recipe">Add new recipe</Link>
        <Link to="/recipes">Recipes</Link>
      </nav>
    </div>
  );
};
