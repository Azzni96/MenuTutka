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
    <div>
      <div>
        <AddRestaurant/>
      </div>
      <h1>All Restaurants</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(restaurants) && restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
            {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div></div>
        <h2>Restaurant List</h2>
        <RestaurantList /> {/* Include the RestaurantList component */}
      </div>

  );
};

export default AdminRestaurantList;
