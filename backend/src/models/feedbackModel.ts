import pool from "../database/DB";

export type Feedback = {
    id?: number;
    user_id: number;
    restaurant_id: number;
    comment: string;
    rating: number;
    created_at?: Date;
};

// إضافة feedback
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
export const getAverageRatingByRestaurant = async (restaurant_id: number): Promise<number | null> => {
    const conn = await pool.getConnection();
    try {
        console.log("Fetching rating for restaurant_id:", restaurant_id);

        const rows: any = await conn.query(
            "SELECT AVG(rating) AS average FROM feedback WHERE restaurant_id = ?",
            [restaurant_id]
        );
        console.log("Query rows: ", rows);

        const avg = rows[0]?.average || null;

        if (avg === null) {
            return null;
        }

        return parseFloat(avg);
    } catch (err) {
        console.error("DB ERROR:", err);
        throw err;
    } finally {
        conn.release();
    }
};
