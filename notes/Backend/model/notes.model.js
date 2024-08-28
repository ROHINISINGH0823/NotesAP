import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures name is always provided
  },
  price: {
    type: Number,
    required: true, // Ensures price is always provided
  },
  category: {
    type: String,
    required: true, // Ensures category is always provided
  },
  image: {
    type: String,
    required: true, // Ensures image is always provided
  },
  title: {
    type: String,
    required: true, // Ensures title is always provided
  },
  tags: {
    type: [String],
    default: [], // Initialize tags as an empty array if not provided
  },
  rollNumber: {
    type: String, // Assuming roll number is a string (change to Number if necessary)
    required: true, // Ensures roll number is provided
    index: true,   // Adds an index for faster queries
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
