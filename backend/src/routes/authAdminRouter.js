// src/routes/authAdminRouter.js
const express = require('express');
const authAdminRouter = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const {loginUserSchema} = require('../validators/userValidator');

// 🔐 admin don`t have registration

//region LOGIN - Validate user credentials (with Joi validation)
authAdminRouter.post('/api/admin/login', validateRequest(loginUserSchema), async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            {userId: user._id, role: "admin"},
            process.env.JWT_SECRET,
            {expiresIn: "5h"}
        );

        // ✅ Save token in cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "lax",
            maxAge: 3600000 * 5 // 5 hours
        });

        // Update login status
        user.isLoggedIn = true;
        user.isRegistered = true;
        user.lastActive = Date.now();
        await user.save();

        // Don't send password in response
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            data: userResponse,
            token: token, // ✅ Also send token in response
            message: 'Admin Login successful'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// endregion

module.exports = authAdminRouter;