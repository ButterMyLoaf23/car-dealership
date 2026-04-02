import pool from "./db.js";

//this is to create a service request
export const createServiceRequest = async (userId, vehicleId, serviceType, notes) => {
    await pool.query(`INSERT INTO service_requests (user_id, vehicle_id, service_type, notes) VALUES ($1, $2, $3, $4)`, [userId, vehicleId, serviceType, notes]);
};

export const getUserRequest = async (userId) => {
    const result =await pool.query(`SELECT sr.*, v.title, v.year FROM service_requests sr JOIN vehicles v on sr.vehicle_id = v.id WHERE sr.user_id = $1 ORDER BY sr.created_at DESC`, [userId]);
    return result.rows;
};
export const getAllRequests = async () => {
    const result = await pool.query(`SELECT sr.*, u.name, v.title FROM service_requests sr JOIN users u ON sr.user_id = u.id JOIN vehicles v ON sr.vehicle_id = v.id ORDER BY sr.created_at DESC`);
    return result.rows;
};

export const updateRequestStatus = async (id, status) => {
    await pool.query("UPDATE service_requests SET status = $1 WHERE id = $2", [status, id]);
};