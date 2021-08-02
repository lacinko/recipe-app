import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/PasswordReset.css";

export const PasswordReset = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions!");
    } catch (error) {
      setError("Failed to reset password!");
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <h2 style={{ color: "red" }}>{error}</h2>}
        {message && <h2 style={{ color: "green" }}>{message}</h2>}
        <label>Email</label>
        <input type="email" name="email" required ref={emailRef} />
        <button disabled={loading} type="submit">
          Reset Password
        </button>
        <button disabled={loading} type="submit">
          <Link to="/">Log In</Link>
        </button>
      </form>
      <div className="link-container">
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};
