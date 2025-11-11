// src/routes/authAdminRouter.js
const express = require('express');
const authAdminRouter = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const {loginUserSchema} = require('../validators/userValidator');

// 🔐 admin don`t have registration

authAdminRouter.post('/api/admin/login', validateRequest(loginUserSchema), async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // ✅ CHECK ADMIN ROLE
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // ✅ Generate JWT token with actual user role
        const token = jwt.sign(
            {userId: user._id, role: user.role},  // Use user.role from DB, not hardcoded
            process.env.JWT_SECRET,
            {expiresIn: "5h"}
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 5
        });

        // ✅ Return proper response format
        return res.status(200).json({
            success: true,
            data: {
                userID: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,  // Include role
                profileImg: user.profileImg || "",
                phone: user.phone || "",
                address: user.address || ""
            },
            message: 'Admin login successful'
        });
    } catch (error) {
        console.error("❌ Admin login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
});

module.exports = authAdminRouter;