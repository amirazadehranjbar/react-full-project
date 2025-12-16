// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

//region✅ For JWT-based authentication
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again.'
            });
        }

        user.lastActive = Date.now();
        await user.save();

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
//endregion

//region✅ For Passport session-based authentication (used after Google login)
const ensureUserAuthenticated = (req, res, next) => {
    // Check Passport session first
    if (req.isAuthenticated()) {
        return next();
    }

    // Check JWT token as fallback
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Please login.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        UserModel.findById(decoded.userId).select('-password')
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'User not found. Please login again.'
                    });
                }
                req.user = user;
                next();
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: 'Authentication error'
                });
            });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please login again.'
        });
    }
};
//endregion

//region✅ Check if user has required role
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
//endregion

//region✅ Check if user can perform password-related actions
const requirePassword = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    const user = await UserModel.findById(req.user._id);

    if (!user.password) {
        return res.status(403).json({
            success: false,
            message: 'This action is not available for Google authenticated accounts.'
        });
    }

    next();
};
//endregion

module.exports = {
    authenticate,
    authorizeRole,
    requirePassword,
    ensureUserAuthenticated
};