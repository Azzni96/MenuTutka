import express from "express";
import {
    submitFeedback,
    fetchFeedback,
    fetchFeedbackByRestaurant,
    removeFeedback
} from "../controllers/feedbackController";
import { authenticate, isAdmin } from "../utils/authenticate";

const router = express.Router();

// Lisää palaute (Vain kirjautuneet käyttäjät)
router.post("/submit", authenticate, submitFeedback);

// Hae kaikki palautteet (Vain admin voi hakea)
router.get("/", authenticate, isAdmin, fetchFeedback);

// Hae tietyn ravintolan palautteet
router.get("/:restaurant_id", fetchFeedbackByRestaurant);

// Poista palaute (Vain admin voi poistaa, lisätään tarvittaessa isAdmin-middleware)
router.delete("/:id", authenticate, isAdmin, removeFeedback);

export default router;
