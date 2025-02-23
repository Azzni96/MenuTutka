import pool from "../database/DB";

export type Feedback = {
    id?: number;
    user_id: number;
    restaurant_id: number;
    comment: string;
    rating: number;
    created_at?: Date;
};

// Lisää palaute
export const addFeedback = async (feedback: Feedback): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query(
        "INSERT INTO feedback (user_id, restaurant_id, comment, rating) VALUES (?, ?, ?, ?)",
        [feedback.user_id, feedback.restaurant_id, feedback.comment, feedback.rating]
    );
    conn.release();
};

// Hae kaikki palautteet
export const getAllFeedback = async (): Promise<Feedback[]> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM feedback");
    conn.release();
    return rows;
};

// Hae palautteet tietylle ravintolalle
export const getFeedbackByRestaurant = async (restaurant_id: number): Promise<Feedback[]> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM feedback WHERE restaurant_id = ?", [restaurant_id]);
    conn.release();
    return rows;
};

// Poista palaute
export const deleteFeedback = async (id: number): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM feedback WHERE id = ?", [id]);
    conn.release();
};
