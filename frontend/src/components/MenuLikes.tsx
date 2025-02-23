import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Like = {
  id: number;
  user_id: number;
  menu_id: number;
};

const MenuLikes = () => {
  const { menuId } = useParams();
  const [likes, setLikes] = useState<Like[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/menu/${Number(menuId)}/likes`);
      setLikes(response.data);
    } catch (error) {
      setError("Error fetching likes");
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [menuId]);

  const handleAddLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to like a menu.");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/menu/likes`,
        { menu_id: Number(menuId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikes((prevLikes) => [...prevLikes, { id: Date.now(), user_id: 1, menu_id: Number(menuId) }]); // Mock user_id
      console.log("Like added successfully");
    } catch (error) {
      setError("Error adding like");
      console.error("Error adding like:", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to remove a like.");
        return;
      }

      await axios.delete(`http://localhost:3000/api/menu/likes`, {
        data: { menu_id: Number(menuId) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikes((prevLikes) => prevLikes.filter((like) => like.menu_id !== Number(menuId)));
      console.log("Like removed successfully");
    } catch (error) {
      setError("Error removing like");
      console.error("Error removing like:", error);
    }
  };

  return (
    <div>
      <h1>Menu Likes</h1>
      {error && <p>{error}</p>}
      <ul>
        {likes.map((like) => (
          <li key={like.id}>
            <p>User ID: {like.user_id}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleAddLike}>Add Like</button>
      <button onClick={handleRemoveLike}>Remove Like</button>
    </div>
  );
};

export default MenuLikes;
