// src/middleware/validateRequest.js
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Show all errors, not just the first one
            stripUnknown: true // Remove unknown fields
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }

        // Replace req.body with validated and sanitized data
        req.body = value;
        next();
    };
};

module.exports = validateRequest;