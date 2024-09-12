import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Topic from "../model/Topic.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("Received file:", req.file); // Debugging line
    console.log("Received body:", req.body); // Debugging line

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { topic, subtopic, tags, rollNumber, audience } = req.body;
    const filePath = req.file.path;

    // Choose the schema based on schemaType
    let topicDoc = await Topic.findOne({
      name: topic,
      rollNumber: rollNumber,
      audience: [audience],
    });

    if (!topicDoc) {
      topicDoc = new Topic({
        name: topic,
        subtopics: [],
        rollNumber: rollNumber,
        audience: [audience],
      });
    }

    // Create a subtopic object
    const subtopicObj = { name: subtopic, filePath, tags: tags.split(",") };

    // Add the subtopic to the topic
    topicDoc.subtopics.push(subtopicObj);
    await topicDoc.save();

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
});

export default router;
