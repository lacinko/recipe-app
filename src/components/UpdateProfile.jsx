import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import "../styles/UpdateProfile.css";

export const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { recipes } = useDatabase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
        console.log(currentUser.email);
      });
  };

  return (
    <div className="signup">
      <h2>My Recipes</h2>
      <ul>
        {recipes &&
          recipes
            .filter((recipe) => recipe.createdBy === currentUser.email)
            .map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
      </ul>

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        {error && <h2 style={{ color: "red" }}>{error}</h2>}
        <label>Email</label>
        <input type="email" name="email" ref={emailRef} />

        <label>Password</label>
        <input type="password" name="password" ref={passwordRef} />

        <label>Password Confirmation</label>
        <input
          type="password"
          name="passwordConfirmation"
          ref={passwordConfirmRef}
        />
        <button disabled={loading} type="submit">
          Update
        </button>
        <button disabled={loading}>
          <Link to="/recipes">Cancel</Link>
        </button>
      </form>
    </div>
  );
};
