import express from "express";
import { Gig } from "../../Models/index.js";

const router = express.Router();

router.get("/gigs", async (req, res) => {
    try {
      const { freelancer_id, category, page = 1, limit = 10 } = req.query;
      
      let filter = {};
      if (freelancer_id) filter.freelancer_id = freelancer_id;
      if (category) filter.category = category;
  
      const gigs = await Gig.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalGigs = await Gig.countDocuments(filter).skip(page*limit); 
      console.log(gigs.length);
      
      return res.status(200).json({ gigs, totalGigs });
    } catch (error) {
      console.error("Error fetching gigs:", error);
      return res.status(500).json({ error: "Server error." });
    }
  });
export default router ;