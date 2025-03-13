import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Menu } from "../types/menu";
import AddMenu from "./AddMenu";

const MenuList = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [likedMenus, setLikedMenus] = useState<number[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !user) {
      setError("You must be logged in to view menus.");
      return;
    }

    const fetchMenus = async () => {
      try {
        const response = await axios.get(`/api/menus/${restaurantId}`);
        setMenus(response.data);
      } catch (error: any) {
        setError("Error fetching menus");
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [restaurantId]);

  useEffect(() => {
    const fetchLikedMenus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`/api/menuLikes/user/likes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const likedMenuIds = Array.isArray(response.data) ? response.data.map((like: any) => like.menu_id) : [];
        setLikedMenus(likedMenuIds);
      } catch (error: any) {
        console.error("Error fetching liked menus:", error);
      }
    };

    fetchLikedMenus();
  }, []);

  const handleToggleLike = async (menuId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to like or unlike a menu.");
        return;
      }

      if (likedMenus.includes(menuId)) {
        await axios.delete(`/api/menuLikes`, {
          data: { menu_id: menuId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikedMenus((prev) => prev.filter((id) => id !== menuId));
      } else {
        await axios.post(
          `/api/menuLikes`,
          { menu_id: menuId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedMenus((prev) => [...prev, menuId]);
      }
    } catch (error: any) {
      setError(`Error toggling like: ${error.response?.data?.error || error.message}`);
      console.error("Error toggling like:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(menus)) {
    return <div>No menus available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Menus</h1>
      <AddMenu />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {menus.map((menu) => (
          <div key={menu.id} className="p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <h2 className="text-2xl font-semibold text-black">{menu.name}</h2>
            <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-black mb-4">{menu.description}</p>
            <p className="text-black">{menu.price}</p>
            {menu.image && <img src={menu.image} alt={menu.name} className="h-72 w-full rounded-t-md object-cover mt-4" />}
            <div className="my-2 rounded-md border border-gray-400 p-2">
              <button onClick={() => handleToggleLike(menu.id)} className="block w-full cursor-pointer bg-blue-600 p-2 text-center text-white font-semibold transition-all duration-500 ease-in-out hover:bg-blue-800 mb-2">
                {likedMenus.includes(menu.id) ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
