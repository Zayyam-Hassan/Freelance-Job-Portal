import express from "express";
import Order from "../models/Order.js"; 

const router = express.Router();


router.get("/freelancer/:freelancerId/orders", async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const isClient = req.query.isclient === "true"; 

    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const orders = await Order.find({
      [isClient ? "freelancer_id" : "client_id"]: freelancerId,
      status: { $in: ["Pending", "In Progress"] },
    }).populate("gig_id client_id freelancer_id");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post("/orders", async (req, res) => {
  try {
    const { gig_id, client_id, freelancer_id, total_amount, delivery_date, requirements } = req.body;

    const newOrder = new Order({
      gig_id,
      client_id,
      freelancer_id,
      total_amount,
      delivery_date,
      requirements,
      status: "Pending", 
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
});

export default router;
