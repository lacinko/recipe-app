import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/SignUp.css";

export const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/recipes");
    } catch (error) {
      setError("Failed to create the account!");
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <h2 style={{ color: "red" }}>{error}</h2>}
          <label>Email</label>
          <input type="email" name="email" required ref={emailRef} />

          <label>Password</label>
          <input type="password" name="password" required ref={passwordRef} />

          <label>Password Confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            required
            ref={passwordConfirmRef}
          />
          <button className="signup__btn" disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        <div className="link-container">
          Already have a account? <Link to="/">Log In</Link>
        </div>
        <div className="forgot-password-container">
          Forgot password? <Link to="/password-reset">Reset</Link>
        </div>
      </div>
    </div>
  );
};
