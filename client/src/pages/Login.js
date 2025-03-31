import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import { loginUser } from "../api/auth";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const response = await loginUser({ email, password });

      if (response.error) {
        setError(response.error);
      } else {
        // ✅ Store user token & info
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({ email })); 

        // ✅ Notify Navbar of login
        window.dispatchEvent(new Event("storage"));

        alert("Login successful!");
        navigate("/"); // ✅ Proper navigation
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
