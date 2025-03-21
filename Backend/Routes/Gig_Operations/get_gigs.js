import express from "express";
import { Gig } from "../../Models/index.js";

const router = express.Router();

router.get("/gigs", async (req, res) => {
    try {
        const { freelancer_id, category, tags, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (freelancer_id) filter.freelancer_id = freelancer_id;
        if (category) filter.category = category;
        if (tags) {
            const tagsArray = Array.isArray(tags) ? tags : tags.split(",");
            filter.tags = { $in: tagsArray };
        }

        const gigs = await Gig.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalGigs = await Gig.countDocuments(filter);

        return res.status(200).json({ gigs, totalGigs });
    } catch (error) {
        console.error("Error fetching gigs:", error);
        return res.status(500).json({ error: "Server error." });
    }
});
router.get("/gig/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await Gig.findById(id);

    if (!gig) {
        return res.status(404).json({ error: "Gig not found." });
    }

    return res.status(200).json(gig);
} catch (error) {
    console.error("Error fetching gig:", error);
    return res.status(500).json({ error: "Server error." });
}
});

router.get("/gigs/freelancer/:freelancerId", async (req, res) => {
  try {
      const { freelancerId } = req.params;
      const gigs = await Gig.find({ freelancer_id: freelancerId });

      return res.status(200).json(gigs);
  } catch (error) {
      console.error("Error fetching gigs:", error);
      return res.status(500).json({ error: "Server error." });
  }
});

export default router;
