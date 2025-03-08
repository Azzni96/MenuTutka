import React, { useState, useEffect } from "react";
import axios from "axios";

type Restaurant = {
  id: number;
  name: string;
  address: string;
  phone: string;
  image?: string;
};

const RestaurantsPage: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await axios.get("/api/restaurants", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantsPage;
