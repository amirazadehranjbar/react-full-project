// src/routes/authUserRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const {loginUserSchema} = require('../validators/userValidator');

// region REGISTER
router.post("/api/users/register", async (req, res) => {

    try {

        const {userName, email, password, repeat_password, phone, role} = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({success: false, message: 'Please enter required fields'});
        }

        if (password !== repeat_password) {
            return res.status(400).json({success: false, message: 'Passwords do not match'});
        }


        const isExistUser = await User.findOne({email:email});

        console.log(isExistUser)

        if (isExistUser) {
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        // ✅ hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // ✅ save new user to database
        const newUser = new User({userName, email, password: hashedPassword, phone, role});
        await newUser.save();

        // ✅ generate token for new user **************************************
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        // ✅ save generated toke in cookie ************************************
        res.cookie("jwt", token, {
            httpOnly: true, // avoid accesses java script to cookie
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict", //  CSRF
            maxAge: 3600000 // 1 hour for expire token
        });

        return res.status(200).json({success: true, data: newUser});

    } catch (e) {
        return res.status(400).json({success: false, message: e.message || "Something went wrong"});
    }

})
// endregion

//region LOGIN - Validate user credentials (with Joi validation)
router.post('/api/users/login', validateRequest(loginUserSchema), async (req, res) => {
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

        return res.status(200).json({
            success: true,
            data: userResponse,
            token: token, // ✅ Also send token in response
            message: 'Login successful'
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

module.exports = router;