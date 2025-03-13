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
        const response = await axios.get("/api/feedbacks", {
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
      await axios.delete(`/api/feedbacks/${id}`, {
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
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">All Feedback</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.isArray(feedbacks) && feedbacks.map((feedback) => (
          <div key={feedback.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black">{feedback.user_id}</h2>
            <p className="text-black">{feedback.comment}</p>
            <p className="text-black">Rating: {feedback.rating}</p>
            <p className="text-black">Submitted on: {new Date(feedback.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(feedback.id)} className="bg-red-600 text-white p-2 rounded-lg mt-2 transition duration-300 ease-in-out hover:bg-red-800">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedbackList;
