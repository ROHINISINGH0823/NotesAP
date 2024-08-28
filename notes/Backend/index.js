import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Routes
import topics2Router from "./route/topics2.js";
import notesRoute from "./route/notes.route.js";
import topics3Router from "./route/topic3.js";
import topics4Router from "./route/topic4.js";
import userRoute from "./route/user.route.js";
import topicsRouter from "./route/topics.js";
import uploadsRouter from "./route/uploads.js";

// Models
import Topic from "./model/Topic.js";
import Topic2 from "./model/Topic2.js";
import User from "./model/user.model.js";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

// Routes
app.use("/notes", notesRoute);
app.use("/user", userRoute);
app.use("/topics2", topics2Router);
app.use("/topics3", topics3Router);
app.use("/topics4", topics4Router);
app.use("/topics", topicsRouter);
app.use("/uploads", express.static("uploads"));
app.use("/upload", uploadsRouter);

// File serving endpoint
app.get("/files/:topicId/:subtopicId", async (req, res) => {
  try {
    const { topicId, subtopicId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(topicId) || !mongoose.Types.ObjectId.isValid(subtopicId)) {
      return res.status(400).json({ message: "Invalid topic or subtopic ID" });
    }

    // Find the topic by ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const subtopic = topic.subtopics.id(subtopicId);
    if (!subtopic) {
      return res.status(404).json({ message: "Subtopic not found" });
    }

    const { filePath } = subtopic;

    // Send the file
    res.sendFile(filePath, {
      root: path.resolve(), // Resolving the root directory
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Search endpoint
app.get("/search", async (req, res) => {
  try {
    const { tag } = req.query;

    // Search for topics containing the tag in subtopics
    const topics = await Topic.find({ "subtopics.tags": { $regex: new RegExp(tag, "i") } })
      .select("name subtopics.$");

    if (topics.length === 0) {
      return res.status(404).json({ message: "No notes found for the given tag" });
    }

    res.status(200).json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});