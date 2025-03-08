import { useState, useEffect } from "react";
import axios from "axios";
import { Feedback } from "../types/feedback";
import { useParams, useNavigate } from "react-router-dom";
import './FeedbackList.css';

const FeedbackList = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`/api/feedbacks/${restaurantId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [restaurantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        navigate('/login');
        return;
      }
      const response = await axios.post("/api/feedbacks/submit", {
        restaurant_id: restaurantId,
        comment,
        rating
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setFeedbacks([...feedbacks, response.data]);
        setComment("");
        setRating(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Unauthorized. Token has expired.");
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error("Axios error:", error.response?.data || error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div>
      <h1>Feedback</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating ?? ""}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackList;
