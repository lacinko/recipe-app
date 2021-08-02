import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const RecipeContext = React.createContext();

function RecipeContextProvider(props) {
  const [recipesDatabase, setRecipesDatabase] = useState(
    localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : []
  );

  function addNewRecipe(props) {
    setRecipesDatabase((prevState) =>
      localStorage.setItem("recipes", JSON.stringify([...prevState, props]))
    );
  }

  function editRecipe(value, id) {
    let recipesCopy = [...JSON.parse(localStorage.getItem("recipes"))];
    recipesCopy = recipesCopy.map((recipe) =>
      recipe.id === id ? { ...recipe, note: [...recipe.note, value] } : recipe
    );
    setRecipesDatabase(
      localStorage.setItem("recipes", JSON.stringify(recipesCopy))
    );
  }

  return (
    <RecipeContext.Provider
      value={{ recipesDatabase, addNewRecipe, editRecipe }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}

export { RecipeContextProvider, RecipeContext };
