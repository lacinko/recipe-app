// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = firebaseConfig.auth();
export default firebaseConfig;

export const db = firebase.firestore();

export const addRecipeToDB = (recipe) => {
  return db
    .collection("recipesDB")
    .doc(recipe.id)
    .set(
      recipe,
      (recipe.date = firebase.firestore.FieldValue.serverTimestamp())
    );
};

export const updateRecipesDB = async () => {
  const data = [];
  const call = await db
    .collection("recipesDB")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });
    });
  return data;
};

export const updateRecipeDB = (noteTxt, id) => {
  const recipesDB = db.collection("recipesDB").doc(id);
  recipesDB.update({
    note: firebase.firestore.FieldValue.arrayUnion(noteTxt),
  });
};

export const streamRecipesDB = (observer) => {
  return db.collection("recipesDB").onSnapshot(observer);
};
