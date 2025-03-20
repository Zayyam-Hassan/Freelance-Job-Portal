import express from "express";
import { Gig } from "../../Models/index.js";

const router = express.Router();

router.post("/create_gig", async (req, res) => {
  try {
    const { freelancer_id, title, description, price, category, delivery_time, images, coverimage, gig_extras , gig_tags } = req.body;

    if (!freelancer_id || !title || !description || !price || !category || !delivery_time || !coverimage || !gig_tags) {
      return res.status(400).json({ error: "Missing required gig fields." });
    }

    const gigData = {
      freelancer_id,
      title,
      description,
      price,
      category,
      delivery_time,
      images: images || [],
      coverimage: coverimage ,
      gig_extras: gig_extras || [],
      gig_tags: gig_tags
    };

    const newGig = new Gig(gigData);
    await newGig.save();

    return res.status(201).json({
      message: "Gig created successfully.",
      gig: newGig,
    });
  } catch (error) {
    console.error("Error in /create_gig:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;