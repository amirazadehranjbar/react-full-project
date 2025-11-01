const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const bcrypt= require("bcrypt");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// region Joi schemas
const registerSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
// endregion

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


// region fetch users
router.get("/api/user/fetch" , async(req, res)=>{


    try {

        const userData = await UserModel.find();
        return res.status(200).json(userData);        

    } catch (error) {

        return res.status(201).json(error);
        
    }
})

// endregion

// region register user
router.post('/api/user/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = new UserModel(value);
        await user.save();

        // do not send password back
        const { password, ...userData } = user.toObject();
        return res.status(201).json(userData);
    } catch (err) {
        // handle duplicate key (unique) errors gracefully
        if (err.name === 'ValidationError' || err.code === 11000) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message || 'Register failed' });
    }
});

// endregion

// region login
router.post('/api/user/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await UserModel.findOne({ email: value.email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(value.password , user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // create token (do not put password inside token)
        const token = jwt.sign(
            { id: user._id, userName: user.userName, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Login failed' });
    }
});
// endregion

module.exports = router;
