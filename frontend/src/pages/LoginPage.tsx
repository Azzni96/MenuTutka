import React, { useState } from "react";
import axios from "axios";

interface LoginPageProps {
    onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
      try {
          const response = await axios.post("/api/users/login", {
              email,
              password,
          });
          const { token } = response.data; // Oletetaan, että backend palauttaa JWT-tunnuksen
          onLogin(token); // Päivittää kirjautumistilan
          setMessage("Login successful! Redirecting...");
      } catch (error) {
          console.error("Login error:", error);
          setMessage("Login failed. Please try again.");
      }
  };


    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
};

export default LoginPage;
