import pool from "./db.js";


export const messages = async (userId, name, email, message) => {
    await pool.query(`INSERT INTO contact_messages (user_id, name, email, message) VALUES ($1, $2, $3, $4)`, [userId, name, email, message]);
};

export const getMessages = async () => {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    return result.rows;
};
