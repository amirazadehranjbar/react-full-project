// backend/src/models/userModel.js
const mongoose = require('mongoose');
const {ProductModel} = require("./productModel");
const InventoryModel = require("./inventoryModel");


//region ✅ user schema
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
                },
                price: {
                    type: Number,
                    default: 0
                },
                images:{
                    type:[String],

                },
                productName:{
                    type: String,
                },

                productInventory:{
                    type:Number,
                },

                isOnSale:{
                    type:Boolean,
                    default: false
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
//endregion

//region✅ addToCart method
userSchema.methods.addToCart = async function (productID, quantity = 1) {

    // 1. Make sure the product exists
    const productIndex = this.cart.items.findIndex(
        item => item.productID.toString() === productID.toString()
    );

    const product = await ProductModel.findById(productID);

    if (!product) throw new Error('Product not found');

    // 2. Atomically decrease inventory only if enough stock is left
    const updatedInventory = await InventoryModel.findOneAndUpdate(
        {
            productID: productID,          // <-- correct query
            inventory: {$gte: quantity} // <-- stock-check
        },
        {$inc: {inventory: -quantity}}, // <-- atomic decrement
        {new: true}                       // <-- return updated doc
    );



    if (!updatedInventory) {
        throw new Error('Not enough inventory available');
    }

    const price = product.price;
    const images = product.images;
    const productName = product.name;
    const productInventory = updatedInventory.inventory;
    const isOnSale = product.isOnSale;

    if (productIndex >= 0) {

        this.cart.items[productIndex].quantity += quantity;
        this.cart.items[productIndex].productInventory = updatedInventory.inventory;



    }else {

        this.cart.items.push({
            productID,
            quantity,
            price,
            images,
            productName,
            productInventory,
            isOnSale
        })
    }

    // 4. Persist user document
    return this.save();
};
//endregion

//region ✅ Method to remove from cart
userSchema.methods.removeFromCart = function (productID) {
    this.cart.items = this.cart.items.filter(
        item => item.productID.toString() !== productID.toString()
    );
    return this.save();
};
//endregion




//region ✅ Method to update quantity
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
// endregion

//region ✅ Method to clear cart
userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};
//endregion


module.exports = mongoose.model('User', userSchema);