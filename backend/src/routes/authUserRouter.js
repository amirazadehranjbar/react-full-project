// src/routes/authUserRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const {loginUserSchema} = require('../validators/userValidator');
const passport = require('passport');
const {authenticate, requirePassword, ensureUserAuthenticated} = require("../middleware/authMiddleware");

// region REGISTER
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

        // ✅ hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // ✅ save new user to database
        const newUser = await new User({userName, email, password: hashedPassword, role: "user"});
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

//region ✅ LOGIN
router.post("/api/users/login", async (req, res) => {

    passport.authenticate("local", (error, user, info) => {

        if (error) {
            return res.status(500).json({success: false, message: "something went wrong"});
        }

        if (!user) {
            return res.status(401).json({success: false, message: info || "user not found"});
        }

        req.login(user , (error)=>{

            if (error) {
                return res.status(500).json({success: false, message: "something went wrong"});
            }
            if (!user) {
                return res.status(401).json({success: false, message: "something went wrong"});
            }


            return res.status(200).json({success: true, data: {userID: user._id , username: user.username, email: user.email}});
        })
    })
    (req, res)

})
// endregion

//region ✅ user data - ME
router.get("/api/users/me", ensureUserAuthenticated ,async (req, res) => {

    try {

        return res.json({success: true, data: {userID: req.user._id, username: req.user.userName, email: req.user.email}});

    } catch (e) {
        return res.status(400).json({success: false, message: "something went wrong"});
    }

})
// endregion

// region ✅ logout
router.get("/api/users/logout", ensureUserAuthenticated ,async (req, res) => {

    req.logout((error)=>{
        if (error) {
            return res.status(500).json({success: false, message: "something went wrong"});
        }
        res.status(401).json({success: true, message: "user logged out"});
    });

})
// endregion

// //region LOGIN - Validate user credentials (with Joi validation)
// router.post('/api/users/login', validateRequest(loginUserSchema), async (req, res) => {
//     try {
//         const {email, password} = req.body;
//
//         // Find user by email
//         const user = await User.findOne({email});
//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }
//
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }
//
//         // ✅ Generate JWT token
//         const token = jwt.sign(
//             {userId: user._id, role: user.role},
//             process.env.JWT_SECRET,
//             {expiresIn: "5h"}
//         );
//
//         // ✅ Save token in cookie
//         res.cookie("jwt", token, {
//             httpOnly: true,
//             secure: false, // Set to true in production with HTTPS
//             sameSite: "lax",
//             maxAge: 3600000 * 5 // 5 hours
//         });
//
//         // Update login status
//         user.isLoggedIn = true;
//         user.isRegistered = true;
//         user.lastActive = Date.now();
//         await user.save();
//
//         // Don't send password in response
//         const userResponse = user.toObject();
//         delete userResponse.password;
//
//         return res.status(200).json({
//             success: true,
//             data: userResponse,
//             token: token, // ✅ Also send token in response
//             message: 'Login successful'
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
// // endregion
//
//
// //region ✅ Google Auth Route
// router.get("/api/users/auth/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"]
//     })
// );
// // endregion
//
// //region ✅ ADD: Google Callback Route
// router.get("/auth/google/redirect",
//     passport.authenticate("google", {
//         failureRedirect: "/api/user/register"
//     }),
//     async (req, res) => {
//         try {
//             // User is authenticated, create JWT token
//             const token = jwt.sign(
//                 { userId: req.user._id, role: req.user.role },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "5h" }
//             );
//
//             // Save token in cookie
//             res.cookie("jwt", token, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "lax",
//                 maxAge: 3600000 * 5
//             });
//
//             // Update user status
//             req.user.isLoggedIn = true;
//             req.user.isRegistered = true;
//             req.user.lastActive = Date.now();
//             await req.user.save();
//
//             // Redirect to frontend
//             res.redirect("http://localhost:5173/api/user");
//         } catch (error) {
//             console.error("Google auth callback error:", error);
//             res.redirect("http://localhost:5173/api/user/register?error=auth_failed");
//         }
//     }
// );
// // endregion
//
// //region ✅ NEW: Get current authenticated user
// router.get("/api/users/me", authenticate, async (req, res) => {
//     try {
//         const userResponse = req.user.toObject();
//         delete userResponse.password;
//
//         return res.status(200).json({
//             success: true,
//             data: userResponse
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
// // endregion
//
// //region ✅ NEW: Change password (only for non-Google users)
// router.post("/api/users/change-password",
//     authenticate,
//     requirePassword, // ✅ Ensures user has a password
//     async (req, res) => {
//         try {
//             const { currentPassword, newPassword } = req.body;
//
//             const user = await User.findById(req.user._id);
//             const isValid = await bcrypt.compare(currentPassword, user.password);
//
//             if (!isValid) {
//                 return res.status(401).json({
//                     success: false,
//                     message: 'Current password is incorrect'
//                 });
//             }
//
//             user.password = await bcrypt.hash(newPassword, 12);
//             await user.save();
//
//             return res.status(200).json({
//                 success: true,
//                 message: 'Password changed successfully'
//             });
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// );
// // endregion
//
// // region ✅ logout
// router.get("/api/users/auth/logout", async (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: "Logout failed" });
//         }
//         res.clearCookie("jwt");
//         res.json({ success: true, message: "Logged out successfully" });
//     });
// });
// // endregion

module.exports = router;