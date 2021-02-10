import React, { useEffect, useState } from "react";
import "../styles/addRecipe.css";
import { v4 as uuidv4 } from "uuid";

export const AddRecipe = ({ addNewRecipe }) => {
  const [inputTxt, setInputTxt] = useState({
    id: uuidv4(),
    date: new Date().toDateString(),
    title: "",
    prepTime: "",
    rations: "",
    difficulty: "",
    ingredient: "",
    listOfIngredients: [],
    step: "",
    method: [],
    note: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputTxt((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function onSubmit(e) {
    addNewRecipe(inputTxt);
    setInputTxt({
      id: uuidv4(),
      date: new Date().toDateString(),
      title: "",
      prepTime: "",
      rations: "",
      difficulty: "",
      ingredient: "",
      listOfIngredients: [],
      step: "",
      method: [],
    });
  }

  function addIngToList(e) {
    const { name } = e.target;
    switch (name) {
      case "ingredient":
        setInputTxt((prevInput) => ({
          ...prevInput,
          listOfIngredients: [
            ...inputTxt.listOfIngredients,
            inputTxt.ingredient,
          ],
          ingredient: "",
        }));

        break;
      case "step":
        setInputTxt((prevInput) => ({
          ...prevInput,
          method: [...inputTxt.method, inputTxt.step],
          step: "",
        }));
        break;

      default:
        break;
    }
  }

  function deleteFromList(e) {
    const { name } = e.target;
    switch (name) {
      case "ingredient":
        console.log(e.target.id);
        setInputTxt((prevInput) => ({
          ...prevInput,
          listOfIngredients: inputTxt.listOfIngredients.filter(
            (i, idx) => idx != e.target.id
          ),
        }));
        break;
      case "step":
        console.log(e.target.id);
        setInputTxt((prevInput) => ({
          ...prevInput,
          method: inputTxt.method.filter((i, idx) => idx != e.target.id),
        }));
        break;

      default:
        break;
    }
  }

  useEffect(() => {}, [inputTxt]);

  return (
    <div>
      <div className="addRecipe">
        <h2>Add a new recipe</h2>
        <form className="addRecipeForm" onSubmit={onSubmit}>
          <div className="recipe-info">
            <h3>Recipe Info</h3>
            <label>
              <input
                type="text"
                name="title"
                value={inputTxt.title}
                onChange={handleChange}
                placeholder="Recipe name"
                className="info"
              />
            </label>
            <label>
              <input
                type="number"
                name="prepTime"
                value={inputTxt.prepTime}
                onChange={handleChange}
                placeholder="Preparation time"
              />
            </label>
            <label>
              <select
                name="difficulty"
                value={inputTxt.difficulty}
                onChange={handleChange}
                className="addRecipe__option--default"
              >
                <option defaultValue value="-----">
                  Difficulty
                </option>
                <option value="Beginner">Beginer</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </label>
            <label>
              <input
                type="number"
                name="rations"
                value={inputTxt.rations}
                onChange={handleChange}
                placeholder="Servings"
              />
            </label>
          </div>
          <div className="ingredients-info">
            <h3>Ingredients</h3>
            <ul>
              {inputTxt.listOfIngredients.length > 0
                ? inputTxt.listOfIngredients.map((ing, idx) => (
                    <li key={ing + Math.floor(Math.random() * 300)}>
                      {" "}
                      {ing}{" "}
                      <button
                        onClick={deleteFromList}
                        id={idx}
                        name="ingredient"
                        className="btn"
                        type="button"
                      >
                        X
                      </button>
                    </li>
                  ))
                : ""}
            </ul>
            <label>
              List of ingredients:
              <div>
                <input
                  type="text"
                  name="ingredient"
                  value={inputTxt.ingredient}
                  onChange={handleChange}
                />
                <button
                  onClick={addIngToList}
                  name="ingredient"
                  className="btn"
                  type="button"
                >
                  ADD
                </button>
              </div>
            </label>
          </div>
          <div className="recipe-text">
            <h3>Preparation method</h3>
            <ol>
              {inputTxt.method.length > 0
                ? inputTxt.method.map((ing, idx) => (
                    <li key={ing + Math.floor(Math.random() * 300)}>
                      {" "}
                      {ing}{" "}
                      <button
                        onClick={deleteFromList}
                        id={idx}
                        name="step"
                        className="btn"
                        type="button"
                      >
                        X
                      </button>
                    </li>
                  ))
                : ""}
            </ol>
            <label>
              <textarea
                name="step"
                value={inputTxt.step}
                onChange={handleChange}
                rows="5"
                cols="40"
                placeholder="Add a new step"
              />
              <button
                onClick={addIngToList}
                name="step"
                className="btn"
                type="button"
              >
                ADD
              </button>
            </label>
          </div>
        </form>
        <button className="btn-submit" onClick={onSubmit} type="submit">
          Save recipe!
        </button>
      </div>
      <div></div>
    </div>
  );
};
