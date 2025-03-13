import React, { useState } from "react";
import { handleSubmit } from "../utils/handleSubmit";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(
      "/api/users/forgot-password",
      { email },
      setMessage
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-800">Send Reset Link</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
