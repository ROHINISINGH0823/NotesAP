import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import cors from "cors";

import notesRoute from "./route/notes.route.js";
import userRoute from "./route/user.route.js";
import topicsRouter from "./route/topics.js";
import uploadsRouter from "./route/uploads.js";

import Topic from "./model/Topic.js";

import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "./model/user.model.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000;

//connect to mongodb
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDb");
} catch (error) {
  console.log("Error", error);
}
// app.get("/", (req, res) => {
//   res.send("Hii Arohi");
// });

//defining routes

app.use("/notes", notesRoute);
app.use("/user", userRoute);


app.get("/files/:topicId/:subtopicId", async (req, res) => {
  try {
    const { topicId, subtopicId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(subtopicId)) {
      return res.status(400).json({ message: "Invalid subtopic ID" });
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

    // path = uploads/filename.pdf
    res.sendFile(filePath, {
      root: path.join(import.meta.dirname),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/search', async (req, res) => {
  try {
    const { tag } = req.query;
    
    const topics = await Topic.find({ 'subtopics.tags': { $regex: new RegExp(tag, 'i') } }).select('name subtopics.$');

    
    if (topics.length === 0) {
      return res.status(404).json({ message: 'No notes found for the given tag' });
    }

    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/topics", topicsRouter);
app.use("/upload", uploadsRouter);

//deployment

// if(process.env.NODE_ENV==="production")
// {
//     const dirPath=path.resolve();
//     app.use(express.static("frontend/dist"));
//     app.get("*",(req,res)=>{
//       res.sendFile(path.resolve(dirPath,"frontend","dist","index.html"));
//     })

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `http://localhost:5173/auth/reset/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
