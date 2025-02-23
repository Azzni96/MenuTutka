import { Request, Response } from "express";
import { addFeedback, getAllFeedback, getFeedbackByRestaurant, deleteFeedback } from "../models/feedbackModel";

export const submitFeedback = async (req: Request, res: Response) => {
    try {
        const { restaurant_id, comment, rating } = req.body;
        const user_id = (req as any).user.id; // Haetaan käyttäjän ID tokenista

        if (!restaurant_id || !comment || !rating) {
             res.status(400).json({ error: "All fields are required" });
             return 
        }   

        if (rating < 1 || rating > 5) {
             res.status(400).json({ error: "Rating must be between 1 and 5" });
             return
        }

        await addFeedback({ user_id, restaurant_id, comment, rating });
        res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const fetchFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await getAllFeedback();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const fetchFeedbackByRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurant_id } = req.params;
        const feedback = await getFeedbackByRestaurant(parseInt(restaurant_id));

        if (!feedback.length) {
           res.status(404).json({ message: "No feedback found for this restaurant" });
           return
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const removeFeedback = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteFeedback(parseInt(id));
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
