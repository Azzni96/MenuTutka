import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleForgotPasswordClick = () => {
    navigate(`/forgot-password`);
  };
  const handleSignupClick = () => {
    navigate(`/signup`);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
      navigate("/profile");
    } catch (error: any) {
      setMessage(error.response?.data.error || "An error occurred");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleForgotPasswordClick}>forgot password</button>
      <button onClick={handleSignupClick}>Don't have an account? Sign up</button>
    </div>
  );
};

export default Login;
