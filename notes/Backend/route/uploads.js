import express from 'express';
import multer from 'multer';
import Topic from '../model/Topic.js';
import path from 'path';
const app = express();

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
    const { topic, subtopic } = req.body;
    const filePath = req.file.path;
    
    let topicDoc = await Topic.findOne({ name: topic });
    if (!topicDoc) {
      topicDoc = new Topic({ name: topic, subtopics: [] });
    }

    topicDoc.subtopics.push({ name: subtopic, filePath });
    await topicDoc.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/files/:topicId/:subtopicId', (req, res) => {
  const { topicId, subtopicId } = req.params;
  // Replace this with actual logic to retrieve the PDF URL
  const pdfUrl = `http://path/to/pdf/${topicId}/${subtopicId}.pdf`;

  if (pdfUrl) {
    res.json({ pdfUrl });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});


export default router;