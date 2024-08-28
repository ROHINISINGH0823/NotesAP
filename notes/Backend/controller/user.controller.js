import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, rollNumber } = req.body;

    // Check if a user with the same email or roll number already exists
    const userExists = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (userExists) {
      return res.status(400).json({ message: "User with this email or roll number already exists" });
    }

    // Hash the password
    const hashPassword = await bcryptjs.hash(password, 10);

    // Create the new user
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
      rollNumber,  // Store roll number in the user document
    });

    // Save the new user to the database
    await createdUser.save();

    // Return a success response with user details (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        rollNumber: createdUser.rollNumber,  // Include roll number in response
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist or password doesn't match, return error
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return a success response with user details (excluding password)
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        rollNumber: user.rollNumber,  // Include roll number in response
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
