import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import "../styles/recipeDetail.css";

export const RecipeDetail = ({ recipes, editRecipe }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(
    recipes && recipes.find((recipe) => recipe.id === recipeId)
  );
  const [note, setNote] = useState({ text: "", author: "" });

  function handleChange(e) {
    const { value } = e.target;
    setNote((prevVal) => ({
      ...prevVal,
      text: value,
      author: currentUser.email,
      date: new Date(),
    }));
  }

  function submitNote(e) {
    e.preventDefault();
    if (!currentUser) {
      return history.push("/");
    }
    editRecipe(note, recipeId);
    setNote({ text: "", author: "", date: null });
  }

  const displayDate = (date) => {
    date = new Date(date.seconds * 1000);
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const formattedTime = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const newDate = `${formattedDate} ${formattedTime}`;
    return newDate;
  };

  useEffect(() => {
    setRecipe(recipes && recipes.find((recipe) => recipe.id === recipeId));
  }, [recipes]);

  return (
    <div className="recipeDetail">
      {recipe ? (
        <>
          <div className="recipeDetail__heading">
            <span>
              <h3>{recipe.title}</h3>
              <p>Author: {recipe?.createdBy}</p>
            </span>

            <div className="recipeDetail__header">
              <span>
                <TimerIcon style={{ color: "#f15152" }} />
                <h5> Preparation time: {recipe.prepTime + " min"}</h5>
              </span>
              <span>
                <SpeedIcon style={{ color: "#f15152" }} />
                <h5>Difficulty level: {recipe.difficulty}</h5>
              </span>
              <span>
                <RestaurantIcon style={{ color: "#f15152" }} />
                <h5>Number of servings: {recipe.rations}</h5>
              </span>
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
            <h3>Comments from users</h3>
            {recipe.note
              ? recipe.note.map((note, idx) => (
                  <div className="recipeDetail__comment">
                    <span>
                      {" "}
                      <strong>{note.author} </strong>{" "}
                      <p>{note.date && displayDate(note.date)}</p>
                    </span>
                    <p key={`ID${note.text}${idx}`}>{note.text}</p>
                  </div>
                ))
              : "<h2>No Comments yet!</h2>"}

            <h3>Add a note</h3>
            <textarea
              name="note"
              id=""
              onChange={handleChange}
              value={note.text}
            ></textarea>
            <button className="recipeDetail__btn" onClick={submitNote}>
              ADD NOTE
            </button>
          </div>
        </>
      ) : (
        <h2>Loading Data.... Please wait!</h2>
      )}
    </div>
  );
};
