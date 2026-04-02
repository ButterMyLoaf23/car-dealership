import express from "express";
import { requiredAuth } from "../middleware/global.js";
import { createReview, deleteReview, getReviewById, updateReview, getVehicleIdByReview } from "../models/reviews.js";

const router = express.Router();

//This will be for adding reviews
router.post("/vehicle/:id", requiredAuth, async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const userId = req.session.user.id;

    await createReview(userId, id, rating, comment);

    res.redirect(`/vehicle/${id}`);
});

//this will be for editing reviews
router.post("/:id/delete", requiredAuth, async (req, res) => {
    const { id } = req.params;

    const vehicleId = await getVehicleIdByReview(id);

    await deleteReview(id, req.session.user.id);

    res.redirect(`/vehicle/${vehicleId}`);
});

//this will show my edit form
router.get("/:id/edit", requiredAuth, async (req, res) => {
    const review = await getReviewById(req.params.id);

    if (!review) {
        return res.status(404).send("Review not found");
    }

    res.render("reviewEdit", { review });
});

//this will be for updating comments
router.post("/:id", requiredAuth, async (req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;

    const vehicleId = await getVehicleIdByReview(id);

    await updateReview(id, req.session.user.id, rating, comment);

    res.redirect(`/vehicle/${vehicleId}`);
});

router.get("/test", (req, res) => {
    res.send("Review routes working");
});

export default router;