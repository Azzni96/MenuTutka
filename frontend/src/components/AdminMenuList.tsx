import { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "../types/menu";
import { useNavigate } from "react-router-dom";

const AdminMenuList = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          navigate('/login');
          return;
        }
        const response = await axios.get("/api/menus", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMenus(response.data);
      } catch (error) {
        setError("Error fetching menus");
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        navigate('/login');
        return;
      }
      await axios.delete(`/api/menus/${id}`, { // Include the menu ID in the URL
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMenus(menus.filter(menu => menu.id !== id));
    } catch (error) {
      setError("Error deleting menu");
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">All Menus</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.isArray(menus) && menus.map((menu) => (
          <div key={menu.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black">{menu.name}</h2>
            <p className="text-black">{menu.description}</p>
            <p className="text-black">Price: {menu.price}</p>
            <p className="text-black">Restaurant ID: {menu.restaurant_id}</p>
            {menu.image && <img src={menu.image} alt={menu.name} className="w-full h-auto mt-2 rounded-lg" />}
            <button onClick={() => handleDelete(menu.id)} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-red-800">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenuList;
