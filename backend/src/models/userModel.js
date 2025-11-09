// src/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        // ✅ Password is NOT required (for Google auth users)
        required: false
    },
    profileImg: String,


    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },


    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});


module.exports = mongoose.model('User', userSchema);