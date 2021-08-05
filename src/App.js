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
        <PrivateRoute exact path="/" isLogged={true} component={Login} />
        <PrivateRoute path="/sign-up" isLogged={true} component={SignUp} />
        <PrivateRoute
          path="/password-reset"
          isLogged={true}
          component={PasswordReset}
        />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/add-recipe">
          <AddRecipe addNewRecipe={addRecipeToDB} />
        </Route>
        <Route exact path="/recipes">
          <Recipes recipes={recipes} />
        </Route>
        <Route path="/recipes/:recipeId">
          <RecipeDetail
            key={`randomKey`}
            recipes={recipes}
            editRecipe={updateRecipeDB}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
