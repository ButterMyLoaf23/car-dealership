import express from "express";
import { messages, getMessages } from "../models/contact.js";
import {requiredRole} from "../middleware/global.js";

const router = express.Router();

// this will be the contact form fpor all users
router.get("/contact", (req, res) => {
    res.render("contact");
});

//This is for submitting the contact form
router.post("/contact", async (req, res) => {
    const {name, email, message} = req.body;

    const userId = req.session.user;

    await messages(userId, name, email, message);
    res.redirect("/contact");
});

router.get("/contact/manage", requiredRole("admin"), async (req, res) => {
    const messages = await getMessages();

    res.render("contactDashboard", {messages});
});

export default router;