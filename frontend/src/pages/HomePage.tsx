import React from "react";
import { Link } from "react-router-dom";

type HomePageProps = {
    onLogout: () => void;
};

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={onLogout}>Logout</button>
            <Link to="/restaurants">Go to Restaurants</Link>
        </div>
    );
};

export default HomePage;
