import pool from "../database/DB";

export type Menu = {
    id?: number;
    restaurant_id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
};

export const getMenusByRestaurant = async (restaurant_id: number): Promise<Menu[]> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM menus WHERE restaurant_id = ?", [restaurant_id]);
    conn.release();
    return rows;
}

export const getAllMenus = async (): Promise<Menu[]> => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM menus");
  conn.release();
  return rows;
};

export const createMenu = async (menu: Menu): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO menus (restaurant_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)",
      [menu.restaurant_id, menu.name, menu.description, menu.price, menu.image]
    );  
    conn.release();
}

export const deleteMenu = async (id: number): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM menus WHERE id = ?", [id]);
    conn.release();
}
