import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data.error || "An error occurred");
    }
  };

  const handleLoginClick = () => {
    navigate(`/login`);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black" />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg transition duration-300 ease-in-out hover:bg-blue-800">Sign Up</button>
      </form>
      <button onClick={handleLoginClick} className="w-full mt-4 px-4 py-2 bg-gray-600 text-white font-bold rounded-lg transition duration-300 ease-in-out hover:bg-gray-800">Already have an account? Login</button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default Signup;
