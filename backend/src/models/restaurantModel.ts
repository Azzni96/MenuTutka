import pool from "../database/DB";


export type Restaurant = {
    id?: number;
    name: string;
    address: string;
    phone: string;
    image?: string | null;

};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM restaurants");
    conn.release();
    return rows;
}

export const createRestaurant = async (restaurant: Restaurant): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO restaurants (name, address, phone, image) VALUES (?, ?, ?, ?)",
      [restaurant.name, restaurant.address, restaurant.phone, restaurant.image]
    );
    conn.release();
  };

export const deleteRestaurant = async (id: number): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM restaurants WHERE id = ?", [id]);
    conn.release();
}