// backend/src/routes/authUserRouter.js
//region imports
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {ensureUserAuthenticated, authenticate} = require("../middleware/authMiddleware");
const {ProductModel} = require("../models/productModel");
const InventoryModel = require("../models/inventoryModel");
const multer = require("multer");
const {isAuthenticated} = require("passport/lib/http/request");
//endregion

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
                    profileImg: user.profileImg || "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
                    cart: user.cart
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
            data: req.user
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

//region ✅ add to user's cart
router.post("/api/users/add-to-cart", ensureUserAuthenticated, async (req, res) => {
    try {
        const {productID, quantity = 1} = req.body;  // ← Default quantity to 1

        // Validate productID
        if (!productID) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        // Get user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.addToCart(productID, quantity);


        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart: user.cart
        });

    } catch (e) {
        console.error("❌ Add to cart error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Failed to add product to cart"
        });
    }
});
//endregion

//region ✅ get user's cart - FIXED
router.get("/api/users/cart", ensureUserAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // ✅ Refresh inventory for all items
        for (let item of user.cart.items) {
            const product = await ProductModel.findById(item.productID);
            if (product) {
                item.productInventory = product.inventory;
                item.price = product.price;
                item.productName = product.name;
                item.images = product.images;
                item.isOnSale = product.isOnSale;
            }
        }

        await user.save();

        return res.status(200).json({
            success: true,
            cart: user.cart // ← Return full cart object
        });

    } catch (e) {
        console.error("❌ Get cart error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Failed to get cart"
        });
    }
});
//endregion


//region ✅ remove from cart
router.delete("/api/users/cart/:productID", ensureUserAuthenticated, async (req, res) => {
    try {
        const {productID} = req.params;

        const user = await User.findById(req.user._id);
        await user.removeFromCart(productID);
        //await user.populate('cart.items.productID');

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: user.cart
        });

    } catch (e) {
        console.error("❌ Remove from cart error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Failed to remove product from cart"
        });
    }
});
//endregion

//region ✅ update cart item quantity - FIXED
router.put("/api/users/cart/update-quantity", ensureUserAuthenticated, async (req, res) => {
    try {

        const {productID, amount} = req.body;

        if (!amount || amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Valid quantity is required"
            });
        }

        // ✅ Check product inventory
        const product = await ProductModel.findById(productID);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.inventory < amount) {
            return res.status(400).json({
                success: false,
                message: `Not enough inventory. Only ${product.inventory} available.`
            });
        }

        const user = await User.findById(req.user._id);

        const cartItemIndex = user.cart.items.findIndex(
            item => item.productID.toString() === productID.toString()
        );

        if (cartItemIndex >= 0) {
            if (amount <= 0) {
                user.cart.items.splice(cartItemIndex, 1);
            } else {
                user.cart.items[cartItemIndex].quantity = amount;
            }
        }


        await user.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: user.cart
        });

    } catch (e) {
        console.error("❌ Update cart error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Failed to update cart"
        });
    }
});
//endregion


//region ✅ clear cart
router.delete("/api/users/cart", ensureUserAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        await user.clearCart();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart: user.cart
        });

    } catch (e) {
        console.error("❌ Clear cart error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Failed to clear cart"
        });
    }
});
//endregion

//region✅ upload profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // ✅Save files to public/images/profile folder
        cb(null, 'public/images/profile');
    },
    filename: function (req, file, cb) {
        // ✅Add timestamp to prevent filename conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage: storage})
router.post("/api/users/upload-image", ensureUserAuthenticated, upload.single('profileImg'), async (req, res) => {

    try {

        // ✅Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({success: false, message: "No file uploaded"});
        }

        const userID = req.user._id;

        const foundedUser = await User.findById(userID);

        if (!foundedUser) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        // ✅ FIXED: Store URL path (not filesystem path) so frontend can access it
        // Frontend will use: http://localhost:3500/images/profile/filename.jpg
        foundedUser.profileImg = `/images/profile/${req.file.filename}`;

        await foundedUser.save();

        console.log("✅ Profile image URL saved:", foundedUser.profileImg);

        return res.status(200).json({
            success: true,
            message: "Uploaded successfully.",
            data: {
                profileImg: foundedUser.profileImg,
                // ✅ ADDED: Full URL for easier frontend use
                fullUrl: `http://localhost:${process.env.PORT || 3500}${foundedUser.profileImg}`
            }
        });


    } catch (err) {
        console.error("❌ Upload error:", err);
        return res.status(500).json({success: false, message: err.message || "Failed to upload image"});
    }

});


//endregion

module.exports = router;