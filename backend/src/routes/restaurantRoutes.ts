import express from "express"
import { fetchRestaurants, addRestaurant, removeRestaurant } from "../controllers/restaurantController"
import upload from "../utils/multerConfig";
import { authenticate, isAdmin } from "../utils/authenticate";



const router = express.Router();

router.get("/", fetchRestaurants)
router.post("/add", authenticate, isAdmin, upload.single("image"), addRestaurant)
router.delete("/:id", authenticate, isAdmin, removeRestaurant)

export default router;