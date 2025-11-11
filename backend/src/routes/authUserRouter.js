// backend/src/routes/authUserRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const {loginUserSchema} = require('../validators/userValidator');
const passport = require('passport');
const {authenticate, requirePassword, ensureUserAuthenticated} = require("../middleware/authMiddleware");

//region ✅ REGISTER
router.post("/api/users/register", async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if (!userName || !email || !password) {
            return res.status(422).json({success: false, message: 'Please enter required fields'});
        }

        const isExistUser = await User.findOne({email: email});

        if (isExistUser) {
            return res.status(422).json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({userName, email, password: hashedPassword, role: "user"});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600000
        });

        return res.status(200).json({success: true, data: newUser});

    } catch (e) {
        return res.status(400).json({success: false, message: e.message || "Something went wrong"});
    }
})
// endregion

//region ✅ LOGIN
router.post("/api/users/login", (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            return res.status(500).json({success: false, message: "Something went wrong"});
        }

        if (!user) {
            return res.status(401).json({success: false, message: info?.message || "User not found"});
        }

        req.login(user, (error) => {
            if (error) {
                return res.status(500).json({success: false, message: "Something went wrong"});
            }

            // ✅ Generate JWT for session
            const token = jwt.sign(
                {userId: user._id, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: "5h"}
            );

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 3600000 * 5
            });

            return res.status(200).json({
                success: true,
                data: {
                    userID: user._id,
                    username: user.userName,
                    email: user.email,
                    profileImg: user.profileImg
                }
            });
        });
    })(req, res, next);
});
// endregion

//region ✅ user data - ME
router.get("/api/users/me", ensureUserAuthenticated, async (req, res) => {
    try {
        return res.json({
            success: true,
            data: {
                userID: req.user._id,
                username: req.user.userName,
                email: req.user.email,
                profileImg: req.user.profileImg
            }
        });
    } catch (e) {
        return res.status(400).json({success: false, message: "Something went wrong"});
    }
});
// endregion

// region ✅ Google Auth - INITIAL ROUTE (user clicks here)
router.get("/api/users/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
// endregion

// region ✅ Google Auth - CALLBACK ROUTE (Google redirects here)
router.get("/api/users/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/api/users/login?error=auth_failed",
        session: true
    }),
    async (req, res) => {
        try {
            console.log("✅ Google auth successful, user:", req.user);

            // Generate JWT token
            const token = jwt.sign(
                {userId: req.user._id, role: req.user.role},
                process.env.JWT_SECRET,
                {expiresIn: "5h"}
            );

            // Set cookie
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 3600000 * 5
            });

            // Redirect to frontend success page
            res.redirect("http://localhost:5173/api/user");
        } catch (error) {
            console.error("❌ Google auth callback error:", error);
            // res.redirect("http://localhost:5173/api/users/login?error=auth_failed");
        }
    }
);
// endregion

// region ✅ logout
router.get("/api/users/logout", ensureUserAuthenticated, async (req, res) => {
    try {
        console.log("🔵 Logout request - User authenticated:", req.isAuthenticated());
        console.log("🔵 User ID:", req.user?._id);

        req.logout((error) => {
            if (error) {
                console.error("❌ Logout error:", error);
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong during logout"
                });
            }

            // ✅ Clear both cookies
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "lax"
            });

            res.clearCookie("connect.sid", {
                httpOnly: true,
                sameSite: "lax"
            });

            // ✅ Destroy session
            req.session.destroy((err) => {
                if (err) {
                    console.error("❌ Session destroy error:", err);
                }
                console.log("✅ User logged out successfully");
            });

            return res.status(200).json({
                success: true,
                message: "User logged out successfully"
            });
        });
    } catch (error) {
        console.error("❌ Logout catch error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
});
// endregion

//region ✅ add to user`s cart

//endregion

module.exports = router;