import pool from "../database/DB";

export type MenuLike = {
    id?: number;
    user_id: number;
    menu_id: number;
};

export const addMenuLike = async (menuLike: MenuLike): Promise<void> => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            "INSERT INTO menu_likes (user_id, menu_id) VALUES (?, ?)",
            [menuLike.user_id, menuLike.menu_id]
        );
    } finally {
        conn.release();
    }
};

export const removeMenuLike = async (userId: number, menuId: number): Promise<void> => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            "DELETE FROM menu_likes WHERE user_id = ? AND menu_id = ?",
            [userId, menuId]
        );
    } finally {
        conn.release();
    }
};

export const getMenuLikes = async (menuId: number): Promise<MenuLike[]> => {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(
            "SELECT users.id AS user_id, users.name AS user_name FROM menu_likes INNER JOIN users ON menu_likes.user_id = users.id WHERE menu_likes.menu_id = ?",
            [menuId]
        );
        return rows;
    } finally {
        conn.release();
    }
};

export const getUserLikes = async (userId: number): Promise<MenuLike[]> => {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(
            "SELECT menu_id FROM menu_likes WHERE user_id = ?",
            [userId]
        );
        return rows;
    } finally {
        conn.release();
    }
};
