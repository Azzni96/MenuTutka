import { Request, Response } from 'express';
import { getAllMenus, getMenusByRestaurant, createMenu, Menu, deleteMenu } from "../models/menuModel";

export const fetchMenus = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant_id = parseInt(req.params.restaurant_id);
        const menus = await getMenusByRestaurant(restaurant_id);
        
        const menusWithImages = menus.map((menu: Menu) => ({
            ...menu,
            image: menu.image ? `/uploads/${menu.image}` : null,
        }));
        res.status(200).json(menusWithImages);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

export const addMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant_id = parseInt(req.params.restaurant_id);
        const { name, description, price } = req.body;
        const image = req.file?.filename;
        await createMenu({ restaurant_id, name, description, price, image });
        res.status(201).json({ message: "Menu added successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const fetchAllMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await getAllMenus();
    const menusWithImages = menus.map((menu: Menu) => ({
      ...menu,
      image: menu.image ? `/uploads/${menu.image}` : null,
    }));
    res.status(200).json(menusWithImages);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const removeMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        await deleteMenu(id);
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}