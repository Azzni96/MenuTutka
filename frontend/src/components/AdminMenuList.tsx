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
        const response = await axios.get("http://localhost:3000/api/menus", {
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
      await axios.delete(`http://localhost:3000/api/menus/${id}`, { // Include the menu ID in the URL
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
    <div>
      <h1>All Menus</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(menus) && menus.map((menu) => (
          <li key={menu.id}>
            <h2>{menu.name}</h2>
            <p>{menu.description}</p>
            <p>Price: {menu.price}</p>
            <p>Restaurant ID: {menu.restaurant_id}</p>
            {menu.image && <img src={menu.image} alt={menu.name} />}
            <button onClick={() => handleDelete(menu.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenuList;
