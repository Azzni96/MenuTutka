import express from "express";
import { addLikeHandler, removeLikeHandler, getLikesHandler, getUserLikesHandler, getLikesCountHandler, getMenuLikesCountByIdHandler } from "../controllers/menuLikesController";
import { authenticate } from "../utils/authenticate"; // Ensure the import is consistent

const router = express.Router();

// Lisää tykkäys
router.post("/", authenticate, addLikeHandler);

// Poista tykkäys
router.delete("/", authenticate, removeLikeHandler);

// Hae tietyn ruokalajin tykkäykset
router.get("/:menuId", getLikesHandler);

// Hae tietyn ruokalajin tykkäysten määrä
router.get("/:menuId/count", getMenuLikesCountByIdHandler);

// Hae käyttäjän tykkäykset
router.get("/user/likes", authenticate, getUserLikesHandler);

// Hae kaikkien ruokalajien tykkäysten määrä
router.get("/count", getLikesCountHandler);

export default router;
