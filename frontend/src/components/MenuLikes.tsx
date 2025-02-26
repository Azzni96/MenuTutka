import { useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Like = {
  id: number;
  user_id: number;
  menu_id: number;
};

type LikeState = {
  likes: Like[];
  error: string | null;
};

type LikeAction =
  | { type: "SET_LIKES"; payload: Like[] }
  | { type: "ADD_LIKE"; payload: Like }
  | { type: "REMOVE_LIKE"; payload: number }
  | { type: "SET_ERROR"; payload: string | null };

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case "SET_LIKES":
      return { ...state, likes: action.payload };
    case "ADD_LIKE":
      return { ...state, likes: [...state.likes, action.payload] };
    case "REMOVE_LIKE":
      return {
        ...state,
        likes: state.likes.filter((like) => like.menu_id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const MenuLikes = () => {
  const { menuId } = useParams();

  const initialState: LikeState = {
    likes: [],
    error: null,
  };

  const [state, dispatch] = useReducer(likeReducer, initialState);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/menu/${Number(menuId)}/likes`
      );
      dispatch({ type: "SET_LIKES", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching likes" });
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
        dispatch({
          type: "SET_ERROR",
          payload: "You must be logged in to like a menu.",
        });
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

      const newLike: Like = {
        id: Date.now(),
        user_id: 1,
        menu_id: Number(menuId),
      };

      dispatch({ type: "ADD_LIKE", payload: newLike });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error adding like" });
      console.error("Error adding like:", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: "SET_ERROR",
          payload: "You must be logged in to remove a like.",
        });
        return;
      }

      await axios.delete(`http://localhost:3000/api/menu/likes`, {
        data: { menu_id: Number(menuId) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "REMOVE_LIKE", payload: Number(menuId) });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error removing like" });
      console.error("Error removing like:", error);
    }
  };

  return (
    <div>
      <h1>Menu Likes</h1>
      {state.error && <p>{state.error}</p>}
      <ul>
        {state.likes.map((like) => (
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
