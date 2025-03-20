import express from "express";
import { User, FreelancerPortfolio } from "../../Models/index.js";

const router = express.Router();

router.post("/professional_info", async (req, res) => {
  try {
    const { userId, full_verification, freelancer_portfolio } = req.body;

    if (!userId || !full_verification || !full_verification.full_name || !full_verification.profile_pic || !full_verification.country || !full_verification.cnic) {
      return res.status(400).json({ error: "Missing required full verification fields." });
    }

    if (!freelancer_portfolio || !freelancer_portfolio.availability || !Array.isArray(freelancer_portfolio.languages) || freelancer_portfolio.languages.length === 0) {
      return res.status(400).json({ error: "Missing required freelancer portfolio fields." });
    }

    const myuser = await User.findById(userId);
    if (!myuser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (myuser.full_verification.length > 0) {
      myuser.full_verification[0] = {
        full_name: full_verification.full_name,
        profile_pic: full_verification.profile_pic,
        country: full_verification.country,
        cnic: full_verification.cnic,
      };
    } else {
      myuser.full_verification.push({
        full_name: full_verification.full_name,
        profile_pic: full_verification.profile_pic,
        country: full_verification.country,
        cnic: full_verification.cnic,
      });
    }

    await myuser.save();

    let existingPortfolio = await FreelancerPortfolio.findOne({ freelancer_id: userId });

    if (existingPortfolio) {
      existingPortfolio.languages = freelancer_portfolio.languages;
      existingPortfolio.availability = freelancer_portfolio.availability;
      existingPortfolio.education = freelancer_portfolio.education || existingPortfolio.education;
      existingPortfolio.skills = freelancer_portfolio.skills || existingPortfolio.skills;
      existingPortfolio.updated_at = new Date();

      await existingPortfolio.save();
    } else {
      const portfolioData = {
        freelancer_id: userId,
        languages: freelancer_portfolio.languages,
        availability: freelancer_portfolio.availability,
        education: freelancer_portfolio.education || [],
        skills: freelancer_portfolio.skills || [],
      };

      existingPortfolio = new FreelancerPortfolio(portfolioData);
      await existingPortfolio.save();
    }

    return res.status(201).json({
      message: "Professional information updated successfully.",
      user: myuser,
      portfolio: existingPortfolio,
    });
  } catch (error) {
    console.error("Error in /professional_info:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
