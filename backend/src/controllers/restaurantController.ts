import { Request, Response, NextFunction } from "express";
import { getAllRestaurants, createRestaurant, deleteRestaurant} from "../models/restaurantModel";

export const fetchRestaurants = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const restaurants = await getAllRestaurants();
        const restaurantsWithImages = restaurants.map((restaurant) => ({
            ...restaurant,
            image: restaurant.image ? `/uploads/${restaurant.image}` : null,
        }))
        res.status(200).json(restaurantsWithImages);
        
    } catch (error) {
        const err = error as Error
        res.status(500).json({ error: err.message });
        next(error);
    }
}

export const addRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, phone } = req.body;
        const image = req.file ? req.file.filename : null;
        await createRestaurant({ name, address, phone, image });
        res.status(201).json({ message: "Restaurant added successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
        next(error);
    }
};

export const removeRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await deleteRestaurant(id);
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
        next(error);
    }
};
