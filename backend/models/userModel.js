const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true , 'username is required'],
        unique: true,
        trim: true
    },

    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true , 'email is required'],
        unique: [true , 'this email is already in used'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format.']
    },

    password:{
        type:String,
        required: true,
    }
});


const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
