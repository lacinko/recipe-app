import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && isLogged) {
          return <Redirect to="/recipes" />;
        }
        if (!currentUser) {
          return <Component {...props} />;
        }
        console.log("Ahoj");
        return <Redirect to="/" />;
      }}
    ></Route>
  );
};
