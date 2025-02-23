import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurant"; // Updated import path
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css'; // Add this line


const RestaurantListforcostmer = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/restaurants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurants(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching restaurants:", error);
        }
      }
    };

    fetchRestaurants();
  }, [navigate]);


  const handleFeedbackClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}/feedback`);
  };

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}/menus`);
  };

  return (
    <div className="container">
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2 onClick={() => handleRestaurantClick(restaurant.id)} style={{ cursor: 'pointer' }}>
              {restaurant.name}
            </h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
            <button onClick={() => handleFeedbackClick(restaurant.id)}>View Feedback</button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default RestaurantListforcostmer;

