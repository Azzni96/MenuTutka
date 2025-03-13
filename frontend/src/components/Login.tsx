import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Login
          </button>
        </form>
        <button onClick={handleForgotPasswordClick} className="mt-4 w-full py-2 px-4 bg-gray-200 text-indigo-600 hover:bg-gray-300 rounded-md">
          Forgot password?
        </button>
        <button onClick={handleSignupClick} className="mt-2 w-full py-2 px-4 bg-gray-200 text-indigo-600 hover:bg-gray-300 rounded-md">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
