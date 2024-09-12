import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  audience: {
    type: [String],  // An array of strings
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
