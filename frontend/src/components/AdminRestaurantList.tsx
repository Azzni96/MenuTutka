import { useState, useEffect } from "react";
import axios from "axios";
import { Restaurant } from "../types/restaurant";
import { useNavigate } from "react-router-dom";
import RestaurantList from "./RestaurantList";
import AddRestaurant from "./AddRestaurant";

const AdminRestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          navigate('/login');
          return;
        }
        const response = await axios.get("/api/restaurants", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRestaurants(response.data);
      } catch (error) {
        setError("Error fetching restaurants");
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        navigate('/login');
        return;
      }
      await axios.delete(`/api/restaurants/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      setError("Error deleting restaurant");
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <AddRestaurant />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-black">All Restaurants</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.isArray(restaurants) && restaurants.map((restaurant) => (
          <div key={restaurant.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black">{restaurant.name}</h2>
            <p className="text-black">{restaurant.address}</p>
            <p className="text-black">{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="mt-2 rounded-lg" />}
            <button onClick={() => handleDelete(restaurant.id)} className="bg-red-600 text-white p-2 rounded-lg mt-2 transition duration-300 ease-in-out hover:bg-red-800">Delete</button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-black">Restaurant List</h2>
        <RestaurantList />
      </div>
    </div>
  );
};

export default AdminRestaurantList;
