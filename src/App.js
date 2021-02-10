import { useContext } from "react";
import { AddRecipe } from "./pages/addRecipe";
import { RecipeContext } from "./recipeContext";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Recipes } from "./pages/recipes";
import { RecipeDetail } from "./pages/recipeDetail";

function App() {
  const { addNewRecipe, recipesDatabase, editRecipe } = useContext(
    RecipeContext
  );
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/add-recipe">
          <AddRecipe addNewRecipe={addNewRecipe} recipes={recipesDatabase} />
        </Route>
        <Route exact path="/recipes">
          <Recipes recipes={recipesDatabase} />
        </Route>
        <Route path="/recipes/:recipeId">
          <RecipeDetail recipes={recipesDatabase} editRecipe={editRecipe} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
