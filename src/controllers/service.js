import express from "express";
import { requiredAuth, requiredRole } from "../middleware/global.js";
import { createServiceRequest, getUserRequest, getAllRequests, updateRequestStatus } from "../models/service.js";

const router = express.Router();

//this is for the user's view of their ticket
router.get("/service", requiredAuth, async (req, res) => {
    const request = await getUserRequest(req.session.user.id);
    res.render("servicePage", { request });
});

//this will show the form
router.get("/service/new", requiredAuth, (req, res) => {
    res.render("serviceForm");
});

//This will be for the creating the request
router.post("/service", requiredAuth, async (req, res) => {
    const { vehicle_id, service_type, notes } = req.body;

    await createServiceRequest(req.session.user.id, vehicle_id, service_type, notes);

    res.redirect("/service");
});

//This is the Admin view
router.get("/service/manage", requiredRole("admin"), async (req, res) => {
    const request = await getAllRequests();

    res.render("serviceDashboard", { request });
});

// this will be for updating the status of the service
router.post("/service/:id/status", requiredRole("admin"), async (req, res) => {
    const { status } = req.body;

    await updateRequestStatus(req.params.id, status);

    res.redirect("/service/Dashboard");
});

export default router;
