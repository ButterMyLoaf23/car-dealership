import express from "express";
import pool from "../models/db.js";
import { requiredAuth } from "../middleware/global.js";

const router = express.Router();

//This will be for adding reviews
router.post("/vehicles/:id/reviews", requiredAuth, async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const userId = req.session.user.id;

    await pool.query("INSERT INTO reviews (user_id, vehicle_id, rating, comment) VALUES ($1, $2, $3, $4)", [userId, id, rating, comment]);

    res.redirect(`/vehicle/${id}`);
});

export default router;