import mongoose from 'mongoose';

const Subtopic4Schema = new mongoose.Schema({
  name: String,
  filePath: String,
  tags: [String],
});

const Topic4Schema = new mongoose.Schema({
  name: String,
  subtopics: [Subtopic4Schema],
  rollNumber: String, // Associate each topic with a roll number
});

const Topic4 = mongoose.model('Topic4', Topic4Schema);
export default Topic4;
