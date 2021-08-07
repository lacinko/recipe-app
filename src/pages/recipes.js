import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/recipes.css";

export const Recipes = ({ recipes }) => {
  const [searchValue, setSearchValue] = useState({
    text: "",
    isSorted: false,
  });
  const [sortedArr, setSortedArr] = useState();

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
            a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
          );
          setSearchValue((prevState) => ({
            ...prevState,
            isSorted: !prevState.isSorted,
          }));
        } else {
          sortedRecipes = [...sortedArr].sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
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
    setSortedArr(recipes);
  }, [recipes]);

  return (
    <div className="recipes">
      <div className="recipes-menu">
        <div className="recipes__search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for recipe"
            onChange={handleChange}
            value={searchValue.text}
            name="text"
          />
        </div>
        <span>
          <button onClick={sortBy} name="name">
            SORT BY NAME
          </button>
          <button onClick={sortBy} name="difficulty">
            SORT BY DIFFICULTY
          </button>
          <button onClick={sortBy} name="prepTime">
            SORT BY PREPARATION TIME
          </button>
        </span>
      </div>
      <ul className="recipes-list">
        {sortedArr
          ? sortedArr
              .filter((val) => {
                if (searchValue.text == "") {
                  return val;
                } else if (
                  val.title
                    .toLowerCase()
                    .includes(searchValue.text.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((recipe, idx) => (
                <li key={recipe.id}>
                  <div className="recipes-top">
                    <Link
                      className="recipes__link"
                      to={`/recipes/${recipe.id}`}
                    >
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
