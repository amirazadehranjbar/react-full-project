// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

//region ✅ check user is authenticated using isAuthentication PassportJS
const ensureUserAuthenticated = (req, res , next) => {

    try {
        if (req.isAuthenticated()) {
            return next();
        }

        return res.status(401).json({success: false, message: 'you must authenticated for access this resource.'});
    } catch (e) {

        return res.status(401).json({success: false, message: e.message});
    }

}
// endregion

//region ✅ Verify JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database (exclude password)
        const user = await UserModel.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again.'
            });
        }

        // ✅ Update last active time
        user.lastActive = Date.now();
        await user.save();

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please login again.'
        });
    }
};
// endregion

//region ✅ Check if user has required role
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
            });
        }

        next();
    };
};
// endregion

//region ✅ NEW: Check if user can perform password-related actions
const requirePassword = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    // Check if user has a password (not a Google OAuth user)
    const user = await UserModel.findById(req.user._id);

    if (!user.password) {
        return res.status(403).json({
            success: false,
            message: 'This action is not available for Google authenticated accounts. Please contact support if you need to set a password.'
        });
    }

    next();
};
// endregion

module.exports = {
    authenticate,
    authorizeRole,
    requirePassword ,
    ensureUserAuthenticated
};