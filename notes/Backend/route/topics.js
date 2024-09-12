import express from "express";
import mongoose from "mongoose";
import Topic from "../model/Topic.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Get all topics based on user's audience
router.get(
  "/",
  authenticate, // Ensure the route is protected
  async (req, res) => {
    try {
      // Extract audience from authenticated user
      const audience = req.user.audience;

      if (!audience || !Array.isArray(audience)) {
        return res.status(400).json({ message: "Invalid audience data" });
      }

      // Find topics based on the user's audience
      const topics = await Topic.find({ audience: { $in: audience } });

      res.json(topics);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get subtopics of a specific topic by ID
router.get("/:id/subtopics", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic.subtopics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new topic
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, subtopics, pdfPath, audience } = req.body;

    if (!name || !subtopics || !audience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTopic = new Topic({ name, subtopics, pdfPath, audience });
    const savedTopic = await newTopic.save();

    res.status(201).json(savedTopic);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "Bad request" });
  }
});

export default router;
