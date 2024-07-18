// routes/auth.js

import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../model/user.model.js";

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');

    // Set token and expiration on the user model
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        to: user.email,
        from: 'rohinisingh0823@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('There was an error: ', err);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            res.status(200).json({ message: 'Recovery email sent' });
        }
    });
});


router.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Set the new password
    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been updated' });
});

export default router;
