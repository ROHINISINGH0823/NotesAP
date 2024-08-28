import express from 'express';
import mongoose from 'mongoose';
import Topic3 from '../model/Topic3.js';

const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic3.find();
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
    const topic = await Topic3.findById(id);
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

    // Create a new Topic2 instance
    const newTopic3 = new Topic3({ name, subtopics, pdfPath });

    // Save the new topic to the database
    const savedTopic3 = await newTopic3.save();

    // Return the saved topic as JSON response
    res.status(201).json(savedTopic3);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
