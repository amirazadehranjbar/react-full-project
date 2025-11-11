// backend/src/models/userModel.js
const mongoose = require('mongoose');
const {ProductModel} = require("./productModel");

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

    cart: {
        items: [
            {
                productID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1
                }
            }
        ]
    },


    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// ✅ addToCart method
userSchema.methods.addToCart = function (productID, quantity = 1) {
    // Find if product already exists in cart
    const cartItemIndex = this.cart.items.findIndex(
        item => item.productID.toString() === productID.toString()
    );

    if (cartItemIndex >= 0) {
        // Product exists, update quantity
        this.cart.items[cartItemIndex].quantity += quantity;
    } else {
        // Product doesn't exist, add new item
        this.cart.items.push({
            productID: productID,
            quantity: quantity
        });
    }

    return this.save();
};

// ✅ Method to remove from cart
userSchema.methods.removeFromCart = function (productID) {
    this.cart.items = this.cart.items.filter(
        item => item.productID.toString() !== productID.toString()
    );
    return this.save();
};

// ✅ Method to update quantity
userSchema.methods.updateCartItemQuantity = function (productID, quantity) {
    const cartItemIndex = this.cart.items.findIndex(
        item => item.productID.toString() === productID.toString()
    );

    if (cartItemIndex >= 0) {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            this.cart.items.splice(cartItemIndex, 1);
        } else {
            this.cart.items[cartItemIndex].quantity = quantity;
        }
    }

    return this.save();
};

// ✅ Method to clear cart
userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};


module.exports = mongoose.model('User', userSchema);