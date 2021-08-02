import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/recipes.css";
import { updateRecipesDB } from "../services/firestore";

export const Recipes = ({ recipes }) => {
  const [searchValue, setSearchValue] = useState({
    text: "",
    isSorted: false,
  });
  const [sortedArr, setSortedArr] = useState(recipes);

  function handleChange(e) {
    const { name, value } = e.target;
    setSearchValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function sortBy(e) {
    let sortedRecipes;

    switch (e.target.name) {
      case "prepTime":
        if (searchValue.isSorted) {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            parseInt(a[e.target.name]) > parseInt(b[e.target.name]) ? -1 : 1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        } else {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            parseInt(a[e.target.name]) > parseInt(b[e.target.name]) ? 1 : -1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        }
        setSortedArr(sortedRecipes);
        break;
      case "difficulty":
        if (searchValue.isSorted) {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            a[e.target.name] === "Beginner"
              ? -1
              : b[e.target.name] === "Expert"
              ? -1
              : 1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        } else {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            a[e.target.name] === "Beginner"
              ? 1
              : b[e.target.name] === "Expert"
              ? 1
              : -1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        }
        setSortedArr(sortedRecipes);
        break;
      default:
        if (searchValue.isSorted) {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            a[e.target.name] > b[e.target.name] ? -1 : 1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        } else {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            a[e.target.name] > b[e.target.name] ? 1 : -1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        }
        setSortedArr(sortedRecipes);
        break;
    }
  }

  useEffect(() => {
    searchValue.text
      ? setSortedArr(
          [...sortedArr].filter((recipe) =>
            recipe.title.toLowerCase().includes(searchValue.text.toLowerCase())
          )
        )
      : console.log("notext");
    // eslint-disable-next-line
  }, [searchValue.text]);

  return (
    <div className="recipes">
      <div className="recipes-menu">
        <input
          type="text"
          placeholder="Search for recipe"
          onChange={handleChange}
          value={searchValue.text}
          name="text"
        />
        <button onClick={sortBy} name="name">
          SORT BY NAME
        </button>
        <button onClick={sortBy} name="difficulty">
          SORT BY DIFFICULTY
        </button>
        <button onClick={sortBy} name="prepTime">
          SORT BY PREPARATION TIME
        </button>
      </div>
      <ul className="recipes-list">
        {sortedArr
          ? sortedArr.map((recipe, idx) => (
              <li key={recipe.id}>
                <div className="recipes-top">
                  <Link className="recipes__link" to={`/recipes/${recipe.id}`}>
                    <h3>{recipe.title}</h3>
                  </Link>
                  <div className="recipes-top-info">
                    <h5>Preparation time: {recipe.prepTime + " min"}</h5>
                    <h5>Difficulty level: {recipe.difficulty}</h5>
                    <h5>Number of servings: {recipe.rations}</h5>
                  </div>
                </div>
              </li>
            ))
          : "<h2>NO DATA</h2>"}
      </ul>
    </div>
  );
};
