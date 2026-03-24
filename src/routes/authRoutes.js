import express from "express";
import pool from "../models/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// this will be my register page
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]
    );

    res.redirect("/login");
});

// this will show my login page
router.get("/login", (req, res) => {
    res.render("login");
});

// this will handle my login stuff
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query (
        "SELECT * FROM users WHERE email = $1", [email]
    );

    const user = result.rows[0];

    if (!user) {
        return res.send("This user was not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.send("Password is incorrect");
    }

    req.session.user = {
        id: user.id,
        role: user.role
    };

    res.redirect("/");
});

export default router;