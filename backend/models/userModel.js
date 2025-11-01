const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [5, 'Username must be at least 5 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },

    isRegister: {
        type: Boolean,
        default: false,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    phone: {
        type: String,
    },

    address: {
        type: String,
    },

    profileImg: {
        type: String,
        default: ''
    },

    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;