import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/recipes");
    } catch (error) {
      setError("Failed to log in!");
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        {error && <h2 style={{ color: "red" }}>{error}</h2>}
        <label>Email</label>
        <input type="email" name="email" required ref={emailRef} />

        <label>Password</label>
        <input type="password" name="password" required ref={passwordRef} />

        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <div className="link-container">
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
      <div className="forgot-password-container">
        Forgot password? <Link to="/password-reset">Reset</Link>
      </div>
    </div>
  );
};
