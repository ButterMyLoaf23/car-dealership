import pool from "./db.js";

//this is to create a service request
export const createServiceRequest = async (userId, make, model, year, serviceType, notes) => {
    await pool.query(`INSERT INTO service_requests (user_id, make, model, year, service_type, notes) VALUES ($1, $2, $3, $4, $5, $6)`, [userId, make, model, year, serviceType, notes]);
};

export const getUserRequest = async (userId) => {
    const result = await pool.query(`SELECT * FROM service_requests WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
    return result.rows;
};
export const getAllRequests = async () => {
    const result = await pool.query(`SELECT sr.*, u.name FROM service_requests sr JOIN users u ON sr.user_id = u.id ORDER BY sr.created_at DESC`);
    return result.rows;
};

export const updateRequestStatus = async (id, status) => {
    await pool.query("UPDATE service_requests SET status = $1 WHERE id = $2", [status, id]);
};