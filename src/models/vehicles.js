import pool from "./db.js";

export const getFeaturedVehicles = async () => {
    const result = await pool.query ("SELECT * FROM vehicles ORDER BY id DESC LIMIT 6");
    return result.rows;
}