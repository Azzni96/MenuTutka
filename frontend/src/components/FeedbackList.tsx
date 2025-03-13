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
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block mb-2 text-black">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block mb-2 text-black">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating ?? ""}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-800">Submit Feedback</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.isArray(feedbacks) && feedbacks.map((feedback) => (
          <div key={feedback.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black">{feedback.user_id}</h2>
            <p className="text-black">{feedback.comment}</p>
            <p className="text-black">Rating: {feedback.rating}</p>
            <p className="text-black">Submitted on: {new Date(feedback.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
