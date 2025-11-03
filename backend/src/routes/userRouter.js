// src/routes/userRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const { loginUserSchema } = require('../validators/userValidator');

//region LOGIN - Validate user credentials (with Joi validation)
router.post('/api/users/login', validateRequest(loginUserSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
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
            {userId: user._id, role: user.role},
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

        res.status(200).json({
            success: true,
            data: userResponse,
            token: token, // ✅ Also send token in response
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// endregion

module.exports = router;