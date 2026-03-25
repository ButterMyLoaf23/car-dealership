import express from "express";
import pool from "../models/db.js";
import { requiredRole } from "../middleware/global.js";

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

//this will show the vehicle add form for the admin view
router.get("/vehicles/new", requiredRole("admin"), async (req, res) => {
    res.render("vehicleAdd");
});

router.post("/vehicles", requiredRole("admin"), async (req, res) => {
    const { year, title, price, description } = req.body;
    
    await pool.query("INSERT INTO vehicles (year, title, price, description) VALUES ($1, $2, $3, $4)", [year, title, price, description]);

    res.redirect("/vehicles");
});

//this will be for deleting vehicles from the page only for admins
router.post("/vehicles/:id/delete", requiredRole("admin"), async (req, res) => {
    const { id } = req.params;

    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);

    res.redirect("/vehicles");
});

//This shows the edit form
router.get("/vehicles/:id/edit", requiredRole("admin"), async (req, res) => {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);

    res.render("vehicleEdit", { vehicle: result.rows[0] });
});

//This will update the vehicle information
router.post("/vehicles/:id", requiredRole("admin"), async (req, res) => {
    const { id } = req.params;
    const { title, price, description, year } = req.body;

    await pool.query("UPDATE vehicles SET title=$1, price=$2, description=$3, year=$4 WHERE id=$5", [title, price, description, year, id]);

    res.redirect(`/vehicle/${id}`);
})

export default router;