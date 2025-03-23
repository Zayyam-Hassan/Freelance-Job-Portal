import express from "express";
import { Gig, User, Review,FreelancerPortfolio } from "../../Models/index.js";

const router = express.Router();

// Fetch all gigs with populated freelancer details and reviews using Promise.all
router.get("/gigs", async (req, res) => {
  try {
    // Find gigs and populate freelancer details
    const gigs = await Gig.find()
      .populate("freelancer_id", "username email full_verification")
      .lean();

    // For each gig, fetch the reviews for the freelancer and add as a property
    const gigsWithReviews = await Promise.all(
      gigs.map(async (gig) => {
        const reviews = await Review.find({ reviewee_id: gig.freelancer_id._id })
          .populate("reviewer_id", "username email full_verification")
          .lean();
        return { ...gig, reviews };
      })
    );

    return res.status(200).json({ gigs: gigsWithReviews, totalGigs: gigsWithReviews.length });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// Fetch a specific gig by ID with populated freelancer details and reviews using Promise.all
router.get("/gig/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the gig and populate freelancer details
    const gig = await Gig.findById(id)
      .populate("freelancer_id", "username email full_verification")
      .lean();

    if (!gig) {
      return res.status(404).json({ error: "Gig not found." });
    }

    const freelancerId = gig.freelancer_id?._id;

    if (!freelancerId) {
      return res.status(404).json({ error: "Freelancer not found for this gig." });
    }

    // Fetch reviews for this freelancer
    const reviews = await Review.find({ reviewee_id: freelancerId })
      .populate("reviewer_id", "username email full_verification")
      .lean();

    // Fetch freelancer's portfolio (including skills)
    const portfolio = await FreelancerPortfolio.findOne({ freelancer_id: freelancerId })
      .lean();

    // Extract skills from portfolio (if exists)
    const skills = portfolio?.skills || [];

    return res.status(200).json({ ...gig, reviews, portfolio, skills });
  } catch (error) {
    console.error("Error fetching gig:", error);
    return res.status(500).json({ error: "Server error." });
  }
});


// Fetch gigs for a specific freelancer with populated reviews using Promise.all
router.get("/gigs/freelancer/:freelancerId", async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const gigs = await Gig.find({ freelancer_id: freelancerId })
      .populate("freelancer_id", "username email full_verification")
      .lean();

    const gigsWithReviews = await Promise.all(
      gigs.map(async (gig) => {
        const reviews = await Review.find({ reviewee_id: freelancerId })
          .populate("reviewer_id", "username email full_verification")
          .lean();
        return { ...gig, reviews };
      })
    );

    return res.status(200).json({ gigs: gigsWithReviews, totalGigs: gigsWithReviews.length });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    return res.status(500).json({ error: "Server error." });
  }
});
router.delete("/gig/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await Gig.findById(id);
    
    if (!gig) {
      return res.status(404).json({ error: "Gig not found." });
    }
    await Gig.findByIdAndDelete(id);
    
    return res.status(200).json({ message: "Gig deleted successfully." });
  } catch (error) {
    console.error("Error deleting gig:", error);
    return res.status(500).json({ error: "Server error." });
  }
});
export default router;
