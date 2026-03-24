import express from "express";
import pool from "../models/db.js";

const router = express.Router();

//this will be to get all the vehicles info
router.get("/vehicles", async (req, res) => {
    const result = await pool.query("SELECT * FROM vehicles");
    res.render("vehicles", { vehicles: result.rows });
});

//this is to get a single vehicle's info
router.get ("/vehicle/:id", async (req, res) => {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);

    res.render("vehicle-detail", { vehicle: result.rows[0] });
});

export default router;