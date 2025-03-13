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
        const response = await axios.get("/api/restaurants", {
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
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 onClick={() => handleRestaurantClick(restaurant.id)} className="text-xl font-bold text-black cursor-pointer">
              {restaurant.name}
            </h2>
            <p className="text-black">{restaurant.address}</p>
            <p className="text-black">{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="mt-2 rounded-lg" />}
            <button onClick={() => handleFeedbackClick(restaurant.id)} className="bg-blue-600 text-white p-2 rounded-lg mt-2 transition duration-300 ease-in-out hover:bg-blue-800">View Feedback</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListforcostmer;

