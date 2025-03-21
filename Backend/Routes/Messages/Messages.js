import express from "express";
import Message from "../models/Message.js"; // Import the Message model

const router = express.Router();

router.put("/messages/:messageId/read", async (req, res) => {
  try {
    const { messageId } = req.params;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { is_read: true },
      { new: true } 
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message marked as read", data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating message status", error: error.message });
  }
});

router.get("/messages/unread/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find unread messages for the user
      const unreadMessages = await Message.find({ receiver_id: userId, is_read: false })
        .populate("sender_id", "name email"); // Populate sender details
  
      res.status(200).json({ success: true, unreadMessages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching unread messages", error: error.message });
    }
  });

  router.put("/messages/read/:chatId/:receiverId", async (req, res) => {
    try {
      const { chatId, receiverId } = req.params;
  
      const updatedMessages = await Message.updateMany(
        { receiver_id: receiverId, is_read: false }, // Update only unread messages
        { is_read: true }
      );
  
      res.status(200).json({ success: true, message: "All messages marked as read", updatedMessages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating messages", error: error.message });
    }
  });
  
export default router;
