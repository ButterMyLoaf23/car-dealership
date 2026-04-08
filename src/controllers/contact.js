import express from "express";
import { messages, getMessages, sentMessage, getFaqMessages } from "../models/contact.js";
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

router.post("/contact/:id", requiredRole("admin"), async (req, res) => {
    const { status, response } = req.body;

    const isFaq = req.body.is_faq ? true : false;

    console.log("REQ BODY:", req.body); // DEBUG

    await sentMessage(req.params.id, status, response, isFaq);

    res.redirect("/contact/manage");
});

router.get("/faq", async (req, res) => {
    const faqs = await getFaqMessages ();

    res.render("faq", {faqs});
});

export default router;