import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      setToken(token);
    } else {
      setMessage("Invalid or missing token");
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/users/reset-password", { password: formData.password, token });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error: any) {
      setMessage(error.response?.data.error || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="password" name="password" placeholder="New Password" onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">Reset Password</button>
      </form>
      {message && <p className="text-red-500 text-center mt-4">{message}</p>}
    </div>
  );
};

export default ResetPassword;
