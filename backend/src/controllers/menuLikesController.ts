import { Request, Response } from "express";
import { addMenuLike, removeMenuLike, getMenuLikes, getUserLikes, getMenuLikesCount, getMenuLikesCountById } from "../models/menuLikesModel";

export const addLikeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { menu_id } = req.body;

        // Varmista, että käyttäjä on kirjautunut
        const userId = (req as any).user.id;
        if (!userId) {
             res.status(401).json({ error: "Unauthorized. Please log in." });
             return
        }

        await addMenuLike({ user_id: userId, menu_id });
        res.status(201).json({ message: "Menu liked successfully." });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const removeLikeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { menu_id } = req.body;

        // Varmista, että käyttäjä on kirjautunut
        const userId = (req as any).user.id;
        if (!userId) {
             res.status(401).json({ error: "Unauthorized. Please log in." });
             return
        }

        await removeMenuLike(userId, menu_id);
        res.status(200).json({ message: "Menu like removed successfully." });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getLikesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuId = parseInt(req.params.menuId);

        const likes = await getMenuLikes(menuId);
        res.status(200).json(likes);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getUserLikesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        const likes = await getUserLikes(userId);
        res.status(200).json(likes);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getLikesCountHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const likesCount = await getMenuLikesCount();
        res.status(200).json(likesCount);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getMenuLikesCountByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuId = parseInt(req.params.menuId);
        const count = await getMenuLikesCountById(menuId);
        res.status(200).json({ menuId, count });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};
