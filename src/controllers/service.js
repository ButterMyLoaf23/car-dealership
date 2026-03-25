import express from "express";
import pool from "../models/db.js";
import { requiredAuth, requiredRole } from "../middleware/global.js";

const router = express.Router();

//this is the for the user only view
router.get("/service", requiredAuth, async (req, res) => {
    const userId = req.session.user.id;

    const result = await pool.query("SELECT * FROM service_requests WHERE user_id = $1", [userId]);

    res.render("servicePage", { requests: result.rows });
});

export default router;
