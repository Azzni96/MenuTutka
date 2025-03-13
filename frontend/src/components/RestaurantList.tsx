import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurant";
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
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

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}/menus`);
  };

  const handleFeedbackClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}/feedback`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <h2 onClick={() => handleRestaurantClick(restaurant.id)} className="text-2xl font-semibold text-black cursor-pointer hover:underline">
              {restaurant.name}
            </h2>
            <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-black mb-4">{restaurant.address}</p>
            <p className="text-black">{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="h-72 w-full rounded-t-md object-cover mt-4" />}
            <div className="my-2 rounded-md border border-gray-400 p-2">
              <button onClick={() => handleFeedbackClick(restaurant.id)} className="block w-full cursor-pointer bg-blue-600 p-2 text-center text-white font-semibold transition-all duration-500 ease-in-out hover:bg-blue-800 mb-2">
                View Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;

