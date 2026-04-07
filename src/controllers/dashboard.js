import express from "express";
import { requiredAuth, requiredRole } from "../middleware/global.js";

const router = express.Router();

// this will only be for users that are logged in
router.get("/dashboard", requiredAuth, (req, res) => {
    res.render("dashboard")
});

// this is for the admin view
router.get("/admin", requiredRole("admin"), (req, res) => {
    res.send("Admin view");
});

export default router;