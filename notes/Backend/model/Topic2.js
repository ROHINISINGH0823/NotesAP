import mongoose from 'mongoose';

const Subtopic2Schema = new mongoose.Schema({
  name: String,
  filePath: String,
  tags: [String],
});

const Topic2Schema = new mongoose.Schema({
  name: String,
  subtopics: [Subtopic2Schema],
  rollNumber: String, // Associate each topic with a roll number
});

const Topic2 = mongoose.model('Topic2', Topic2Schema);
export default Topic2;
