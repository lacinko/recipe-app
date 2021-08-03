import { AddRecipe } from "./pages/addRecipe";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignUp } from "./components/SignUp";
import { PasswordReset } from "./components/PasswordReset";
import { Recipes } from "./pages/recipes";
import { RecipeDetail } from "./pages/recipeDetail";
import { Login } from "./components/Login";
import { UpdateProfile } from "./components/UpdateProfile";
import { useDatabase } from "./contexts/DatabaseContext";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const { recipes, addRecipeToDB, updateRecipeDB } = useDatabase();

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/password-reset">
          <PasswordReset />
        </Route>
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/add-recipe">
          <AddRecipe addNewRecipe={addRecipeToDB} />
        </Route>
        <Route exact path="/recipes">
          <Recipes recipes={recipes} />
        </Route>
        <Route path="/recipes/:recipeId">
          <RecipeDetail
            key={recipes ? "Nazdar" : "Neni"}
            recipes={recipes}
            editRecipe={updateRecipeDB}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
