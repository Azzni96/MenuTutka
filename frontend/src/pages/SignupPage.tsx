import React, { useState } from "react";
import axios from "axios";

const SignupPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                "/api/users/signup",
                { name, email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error("Signup error:", error);
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button onClick={handleSignup}>Signup</button>
            <p>{message}</p>
        </div>
    );
};

export default SignupPage;
