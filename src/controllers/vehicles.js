import express from "express";
import { requiredRole } from "../middleware/global.js";
import { getFeaturedVehicles, getVehicleById, getAllVehicles, getReviewByVehicleId, createVehicle, deleteVehicle, updateVehicle } from "../models/vehicles.js";

const router = express.Router();

//this will be to get all the vehicles info
router.get("/vehicles", async (req, res) => {
    const sort = req.query.sort;
    const vehicles = await getAllVehicles(sort);

    res.render("vehicles", { vehicles, sort });
});

//this is to get a single vehicle's info
router.get ("/vehicle/:id", async (req, res) => {
    const { id } = req.params;
    const vehicle = await getVehicleById(id);
    const reviews = await getReviewByVehicleId(id);

    let avgRating = 0;

if (reviews.length > 0) {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    avgRating = (total / reviews.length).toFixed(1);
}

    res.render("vehicle-detail", { vehicle, reviews, avgRating });
});

//this will show the vehicle add form for the admin view
router.get("/vehicles/new", requiredRole("admin"), async (req, res) => {
    res.render("vehicleAdd");
});

// admin new vehicle form
router.post("/vehicles", requiredRole("admin"), async (req, res) => {
    await createVehicle(req.body);
    res.redirect("/vehicles");
});

//this will be for deleting vehicles from the page only for admins
router.post("/vehicles/:id/delete", requiredRole("admin"), async (req, res) => {
    await deleteVehicle(req.params.id);
    res.redirect("/vehicles");
});

//This shows the edit form
router.get("/vehicles/:id/edit", requiredRole("admin"), async (req, res) => {
    const vehicle = await getVehicleById(req.params.id);

    res.render("vehicleEdit", { vehicle });
});

//This will update the vehicle information
router.post("/vehicles/:id", requiredRole("admin"), async (req, res) => {
    await updateVehicle(req.params.id, req.body);

    res.redirect(`/vehicle/${req.params.id}`);
})

// this is for my featured vehicles on my homepage
router.get("/", async (req, res) => {
    const vehicles = await getFeaturedVehicles();
    res.render("index", {title: "Home", vehicles});
})

export default router;