import mongoose from 'mongoose';

const SubtopicSchema = new mongoose.Schema({
  name: String,
  filePath: String,
});

const TopicSchema = new mongoose.Schema({
  name: String,
  subtopics: [SubtopicSchema],
});

const Topic = mongoose.model('Topic', TopicSchema);
export default Topic;