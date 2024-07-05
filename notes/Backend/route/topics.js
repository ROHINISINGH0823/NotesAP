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

// Get subtopics of a specific topic
router.get('/:id/subtopics', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic.subtopics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;