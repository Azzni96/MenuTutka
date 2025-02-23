import express from "express";
import { addLikeHandler, removeLikeHandler, getLikesHandler, getUserLikesHandler } from "../controllers/menuLikesController";
import { authenticate } from "../utils/authenticate"; // Ensure the import is consistent

const router = express.Router();

// Lisää tykkäys
router.post("/", authenticate, addLikeHandler);

// Poista tykkäys
router.delete("/", authenticate, removeLikeHandler);

// Hae tietyn ruokalajin tykkäykset
router.get("/:menuId", getLikesHandler);

// Hae käyttäjän tykkäykset
router.get("/user/likes", authenticate, getUserLikesHandler);

export default router;
