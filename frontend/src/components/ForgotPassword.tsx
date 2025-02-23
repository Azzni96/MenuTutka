import React, { useState } from "react";
import { handleSubmit } from "../utils/handleSubmit"; // Updated import

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(
      "http://localhost:3000/api/users/forgot-password",
      { email },
      setMessage
    );
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
