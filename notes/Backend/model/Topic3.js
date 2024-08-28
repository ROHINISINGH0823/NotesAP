import mongoose from 'mongoose';

const Subtopic3Schema = new mongoose.Schema({
  name: String,
  filePath: String,
  tags: [String],
});

const Topic3Schema = new mongoose.Schema({
  name: String,
  subtopics: [Subtopic3Schema],
  rollNumber: String, // Associate each topic with a roll number
});

const Topic3 = mongoose.model('Topic3', Topic3Schema);
export default Topic3;
