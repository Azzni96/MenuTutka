import { useState, useEffect } from "react";
import axios from "axios";
import { Feedback } from "../types/feedback";
import { useNavigate } from "react-router-dom";


const AdminFeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          navigate('/login');
          return;
        }
        const response = await axios.get("http://localhost:3000/api/feedbacks", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFeedbacks(response.data);
      } catch (error) {
        setError("Error fetching feedbacks");
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:3000/api/feedbacks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    } catch (error) {
      setError("Error deleting feedback");
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div>
      <h1>All Feedback</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(feedbacks) && feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <h2>{feedback.user_id}</h2>
            <p>{feedback.comment}</p>
            <p>Rating: {feedback.rating}</p>
            <p>Submitted on: {new Date(feedback.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(feedback.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFeedbackList;
