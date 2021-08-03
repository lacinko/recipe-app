import React, { useContext, useEffect, useState } from "react";
import { db } from "../services/firestore";
import firebase from "firebase/app";

const DatabaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
  const [recipes, setRecipes] = useState();

  const addRecipeToDB = (recipe) => {
    return db
      .collection("recipesDB")
      .doc(recipe.id)
      .set(
        recipe,
        (recipe.date = firebase.firestore.FieldValue.serverTimestamp())
      );
  };

  const updateRecipeDB = (noteTxt, id) => {
    return db
      .collection("recipesDB")
      .doc(id)
      .update({
        note: firebase.firestore.FieldValue.arrayUnion(noteTxt),
      });
  };

  useEffect(() => {
    db.collection("recipesDB").onSnapshot((snapshot) => {
      setRecipes(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const value = {
    addRecipeToDB,
    recipes,
    updateRecipeDB,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};
