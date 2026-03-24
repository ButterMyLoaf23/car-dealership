import pool from "./db.js";

const testConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected:", result.rows[0].now);
    } catch (err) {
        console.error("Database had an error:", err);
    }
};

export { testConnection };