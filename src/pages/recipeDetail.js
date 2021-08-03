import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/recipeDetail.css";

export const RecipeDetail = ({ recipes, editRecipe }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(
    recipes.find((recipe) => recipe.id === recipeId)
  );
  const [note, setNote] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setNote(value);
  }

  function submitNote(e) {
    if (!currentUser) {
      return history.push("/");
    }
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      note: [...recipe.note, note],
    }));
    editRecipe(note, recipeId);
    setNote("");
  }
  console.log(recipe);
  return (
    <div className="recipeDetail">
      <div className="recipeDetail__heading">
        <h3>{recipe.title}</h3>
        <div className="recipeDetail__header">
          <h5>Preparation time: {recipe.prepTime + " min"}</h5>
          <h5>Difficulty level: {recipe.difficulty}</h5>
          <h5>Number of servings: {recipe.rations}</h5>
        </div>
      </div>
      <div className="recipeDetail__main">
        <div className="recipeDetail__list">
          <h3 className="recipeDetail__title">List of ingredients</h3>
          <ul>
            {recipe.listOfIngredients.length > 0 ? (
              recipe.listOfIngredients.map((ing, idx) => (
                <li key={idx}> {ing} </li>
              ))
            ) : (
              <h4>No ingredients</h4>
            )}
          </ul>
        </div>
        <div className="recipeDetail__method">
          <h3 className="recipeDetail__title">Method</h3>
          <ol>
            {recipe.method.length > 0 ? (
              recipe.method.map((ing, idx) => (
                <li className="recipeDetail__step" key={idx}>
                  {ing}
                </li>
              ))
            ) : (
              <h4>No ingredients</h4>
            )}
          </ol>
        </div>
      </div>
      <div className="recipeDetail__comments">
        {recipe.note
          ? recipe.note.map((note, idx) => (
              <p key={`ID${note}${idx}`}>{note}</p>
            ))
          : "<h2>No Comments yet!</h2>"}

        <h3>Add a note</h3>
        <textarea
          name="note"
          id=""
          onChange={handleChange}
          value={note}
        ></textarea>
        <button onClick={submitNote}>ADD NOTE</button>
      </div>
    </div>
  );
};
