import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecipeContextProvider } from "./recipeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DatabaseProvider } from "./contexts/DatabaseContext";

ReactDOM.render(
  <AuthProvider>
    <DatabaseProvider>
      <RecipeContextProvider>
        <Router>
          <App />
        </Router>
      </RecipeContextProvider>
    </DatabaseProvider>
  </AuthProvider>,
  document.getElementById("root")
);
