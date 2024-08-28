import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import Topic from '../model/Topic.js';
import Topic2 from '../model/Topic2.js';
import Topic3 from '../model/Topic3.js';  // Import Topic3 schema
import Topic4 from '../model/Topic4.js';  // Import Topic4 schema
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    console.log('Received file:', req.file); // Debugging line
    console.log('Received body:', req.body); // Debugging line

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { topic, subtopic, tags, rollNumber, schemaType } = req.body;
    const filePath = req.file.path;

    // Choose the schema based on schemaType
    let topicDoc;
    if (schemaType === 'Topic') {
      topicDoc = await Topic.findOne({ name: topic, rollNumber: rollNumber });
      if (!topicDoc) {
        topicDoc = new Topic({ name: topic, subtopics: [], rollNumber: rollNumber });
      }
    } else if (schemaType === 'Topic2') {
      topicDoc = await Topic2.findOne({ name: topic, rollNumber: rollNumber });
      if (!topicDoc) {
        topicDoc = new Topic2({ name: topic, subtopics: [], rollNumber: rollNumber });
      }
    } else if (schemaType === 'Topic3') {  // Add condition for Topic3
      topicDoc = await Topic3.findOne({ name: topic, rollNumber: rollNumber });
      if (!topicDoc) {
        topicDoc = new Topic3({ name: topic, subtopics: [], rollNumber: rollNumber });
      }
    } else if (schemaType === 'Topic4') {  // Add condition for Topic4
      topicDoc = await Topic4.findOne({ name: topic, rollNumber: rollNumber });
      if (!topicDoc) {
        topicDoc = new Topic4({ name: topic, subtopics: [], rollNumber: rollNumber });
      }
    } else {
      return res.status(400).json({ message: 'Invalid schema type' });
    }

    // Create a subtopic object
    const subtopicObj = { name: subtopic, filePath, tags: tags.split(',') };
    
    // Add the subtopic to the topic
    topicDoc.subtopics.push(subtopicObj);
    await topicDoc.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
});

export default router;
