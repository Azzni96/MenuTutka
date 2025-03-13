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

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`/api/menu/${menuId}/likes`);
        setLikes(response.data);
      } catch (error) {
        setError("Error fetching likes");
        console.error("Error fetching likes:", error);
      }
    };

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
        `/api/menu/likes`,
        { menu_id: menuId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikes((prevLikes) => [...prevLikes, { id: Date.now(), user_id: 1, menu_id: Number(menuId) }]);
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

      await axios.delete(`/api/menu/likes`, {
        data: { menu_id: menuId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikes((prevLikes) => prevLikes.filter((like) => like.menu_id !== Number(menuId)));
    } catch (error) {
      setError("Error removing like");
      console.error("Error removing like:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Menu Likes</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <ul className="list-none p-0">
        {likes.map((like) => (
          <li key={like.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <p>User ID: {like.user_id}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleAddLike} className="mt-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700">Add Like</button>
      <button onClick={handleRemoveLike} className="mt-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700">Remove Like</button>
    </div>
  );
};

export default MenuLikes;
