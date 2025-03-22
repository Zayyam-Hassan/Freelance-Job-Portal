import express from "express";
import { Review, Order, User } from "../../Models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { order_id, reviewer_id, reviewee_id, rating, comment } = req.body;

    // Validate required fields
    if (!order_id || !reviewer_id || !reviewee_id || !rating) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if order exists
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Check if users exist
    const reviewer = await User.findById(reviewer_id);
    const reviewee = await User.findById(reviewee_id);

    if (!reviewer || !reviewee) {
      return res.status(404).json({ error: "Reviewer or Reviewee not found." });
    }

    // Create a new review
    const review = new Review({
      order_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/:reviewee_id", async (req, res) => {
  try {
    const { reviewee_id } = req.params;

    // Check if user exists
    const user = await User.findById(reviewee_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch all reviews for the given user
    const reviews = await Review.find({ reviewee_id }).populate("reviewer_id", "username email");

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
