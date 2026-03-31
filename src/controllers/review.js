import express from "express";
import pool from "../models/db.js";
import { requiredAuth } from "../middleware/global.js";

const router = express.Router();

//This will be for adding reviews
router.post("/vehicle/:id", requiredAuth, async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const userId = req.session.user.id;

    await pool.query("INSERT INTO reviews (user_id, vehicle_id, rating, comment) VALUES ($1, $2, $3, $4)", [userId, id, rating, comment]);

    res.redirect(`/vehicle/${id}`);
});

//this will be for editing reviews
router.post("/:id/delete", requiredAuth, async (req, res) => {
    const { id } = req.params;

    const result = await pool.query("SELECT vehicle_id FROM reviews WHERE id = $1", [id]);

    const vehicleId = result.rows[0].vehicle_id;

    await pool.query("DELETE FROM reviews WHERE id = $1 and user_id = $2", [id, req.session.user.id]);

    res.redirect("/vehicle/" + vehicleId);
});

//this will show my edit form
router.get("/:id/edit", requiredAuth, async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM reviews WHERE id = $1",
        [req.params.id]
    );

    if (!result.rows.length) {
        return res.status(404).send("Review not found");
    }

    res.render("reviewEdit", { review: result.rows[0] });
});

//this will be for updating comments
router.post("/:id", requiredAuth, async (req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;

    const result = await pool.query("SELECT vehicle_id FROM reviews WHERE id = $1", [id]);

    const vehicleId = result.rows[0].vehicle_id;

    await pool.query("UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 and user_id = $4", [rating, comment,id, req.session.user.id]);

    res.redirect("/vehicle/" + vehicleId);
});

router.get("/test", (req, res) => {
    res.send("Review routes working");
});

export default router;