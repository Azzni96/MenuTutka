import express from "express";
import {
    submitFeedback,
    fetchFeedback,
    fetchFeedbackByRestaurant,
    removeFeedback,
    getRestaurantRating
} from "../controllers/feedbackController";
import { authenticate, isAdmin } from "../utils/authenticate";

const router = express.Router();

// أولاً: route الخاص بـ rating 
router.get("/:restaurant_id/rating", getRestaurantRating);

// ثانياً: route الخاص بـ feedbacks العادية
router.get("/:restaurant_id", fetchFeedbackByRestaurant);

// باقي الراوتات
router.post("/submit", authenticate, submitFeedback);
router.get("/", authenticate, isAdmin, fetchFeedback);
router.delete("/:id", authenticate, isAdmin, removeFeedback);

export default router;
