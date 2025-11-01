const Joi = require('joi');

// Validation for user registration
const registerUserSchema = Joi.object({
    userName: Joi.string()
        .min(5)
        .max(20)
        .required()
        .trim()
        .messages({
            'string.min': 'Username must be at least 5 characters long',
            'string.max': 'Username cannot exceed 20 characters',
            'any.required': 'Username is required'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'io'] } })
        .required()
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            'any.required': 'Password is required'
        }),

    repeat_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords must match',
            'any.required': 'Please confirm your password'
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be 10-15 digits'
        }),

    address: Joi.string()
        .optional(),

    profileImg: Joi.string()
        .uri()
        .optional()
});

// Validation for user login
const loginUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        })
});

// Validation for updating user
const updateUserSchema = Joi.object({
    userName: Joi.string()
        .min(5)
        .max(20)
        .optional(),

    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),

    address: Joi.string()
        .optional(),

    profileImg: Joi.string()
        .uri()
        .optional(),

    isLoggedIn: Joi.boolean()
        .optional()
}).min(1); // At least one field must be provided for update

module.exports = {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema
};