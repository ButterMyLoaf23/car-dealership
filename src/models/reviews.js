import pool from "./db.js";

export const createReview = async (userId, vehicleId, rating, comment) => {
    await pool.query("INSERT INTO reviews (user_id, vehicle_id, rating, comment) VALUES ($1, $2, $3, $4)", [userId, vehicleId, rating, comment]);
};

export const deleteReview = async (id, userId) => {
    await pool.query("DELETE FROM reviews WHERE id = $1 AND user_id = $2", [id, userId]);
};

export const getReviewById = async (id) => {
    const result = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);
    return result.rows[0];
};

export const updateReview = async (id, userId, rating, comment) => {
    await pool.query("UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4", [rating, comment, id, userId]);
};

export const getVehicleIdByReview = async (id) => {
    const result = await pool.query("SELECT vehicle_id FROM reviews WHERE id = $1", [id]);
    return result.rows[0];
};