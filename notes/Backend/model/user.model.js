import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema=mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
  });

const User=mongoose.model("User",userSchema);
export default User;