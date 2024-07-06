import express from 'express';
import mongoose from 'mongoose';
import Topic from '../model/Topic.js';

const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get subtopics of a specific topic by ID
router.get('/:id/subtopics', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }

    // Find the topic by ID
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Return subtopics for the found topic
    res.json(topic.subtopics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const { name, subtopics, pdfPath } = req.body;

    // Create a new Topic instance
    const newTopic = new Topic({ name, subtopics, pdfPath });

    // Save the new topic to the database
    const savedTopic = await newTopic.save();

    // Return the saved topic as JSON response
    res.status(201).json(savedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
