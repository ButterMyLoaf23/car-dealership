import pool from "./db.js";


export const messages = async (userId, name, email, message) => {
    await pool.query(`INSERT INTO contact_messages (user_id, name, email, message) VALUES ($1, $2, $3, $4)`, [userId, name, email, message]);
};

//This will be for the admin to see the messages from the dashboard
export const getMessages = async () => {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    return result.rows;
};

//This is for sending a message back to the originall sender
export const sentMessage = async (id, status, response, is_faq) => {
    await pool.query(`UPDATE contact_messages SET status = $1, response = $2, is_faq = $3 WHERE id = $4`, [status, response, is_faq, id]);
}

//This is for the FAQ page
export const getFaqMessages = async () => {
    const result = await pool.query(`SELECT * FROM contact_messages WHERE is_faq = true AND response IS NOT NULL ORDER BY created_at DESC`);
    return result.rows;
}
