import mongoose from "mongoose";

const SubtopicSchema = new mongoose.Schema({
  name: String,
  filePath: String,
  tags: [String],
});

const TopicSchema = new mongoose.Schema({
  name: String,
  subtopics: [SubtopicSchema],
  rollNumber: String,
  audience: [String],
});

const Topic = mongoose.model("Topic", TopicSchema);

export default Topic;
