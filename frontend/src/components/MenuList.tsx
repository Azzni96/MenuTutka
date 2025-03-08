import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Menu } from "../types/menu"; // Ensure the casing matches the actual file name
import AddMenu from "./AddMenu";

const MenuList = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [likedMenus, setLikedMenus] = useState<number[]>([]); // Track liked menus
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({}); // Track likes count

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

    const fetchLikesCount = async () => {
      try {
        const response = await axios.get(`/api/menuLikes/count`);
        const likesData = response.data.reduce((acc: any, like: any) => {
          acc[like.menu_id] = like.count;
          return acc;
        }, {});
        setLikesCount(likesData);
      } catch (error: any) {
        console.error("Error fetching likes count:", error);
      }
    };

    fetchLikedMenus();
    fetchLikesCount();
  }, []);

  const handleToggleLike = async (menuId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to like or unlike a menu.");
        return;
      }

      if (likedMenus.includes(menuId)) {
        // Remove like
        await axios.delete(`/api/menuLikes`, {
          data: { menu_id: menuId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikedMenus((prev) => prev.filter((id) => id !== menuId));
        setLikesCount((prev) => ({ ...prev, [menuId]: (prev[menuId] || 1) - 1 }));
      } else {
        // Add like
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
        setLikesCount((prev) => ({ ...prev, [menuId]: (prev[menuId] || 0) + 1 }));
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
    <div>
      <h1>Menus</h1>
      <AddMenu />
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <h2>{menu.name}</h2>
            <p>{menu.description}</p>
            <p>{menu.price}</p>
            {menu.image && <img src={menu.image} alt={menu.name} />}
            <button onClick={() => handleToggleLike(menu.id)}>
              {likedMenus.includes(menu.id) ? "Unlike" : "Like"}
            </button>
            <p>Likes: {likesCount[menu.id] || 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
