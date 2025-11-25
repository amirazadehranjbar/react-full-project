// backend/src/models/userModel.js
const mongoose = require('mongoose');
const {ProductModel} = require("./productModel");
const InventoryModel = require("./inventoryModel");

/**
 * ============================================================================
 * USER SCHEMA DEFINITION
 * ============================================================================
 * This schema stores user information including authentication details,
 * profile data, and shopping cart items.
 *
 * IMPORTANT: Cart items store product references and quantities, but NOT
 * inventory counts. Inventory is always fetched from the Inventory collection
 * (single source of truth).
 */

//region ✅ User Schema
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
        required: false  // ✅ Optional for Google OAuth users
    },
    profileImg: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    /**
     * SHOPPING CART STRUCTURE
     * ========================
     * Cart items store:
     * - productID: Reference to product (for fetching current data)
     * - quantity: How many user wants (validated against inventory)
     * - price: Captured at time of adding (for price change tracking)
     * - images, productName, isOnSale: For display purposes
     *
     * ⚠️ DOES NOT STORE: productInventory
     * → Inventory is ALWAYS fetched from Inventory collection in real-time
     * → This prevents stale data and maintains single source of truth
     */
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
                    default: 0  // Price when item was added to cart
                },
                images: {
                    type: [String],
                },
                productName: {
                    type: String,
                },
                isOnSale: {
                    type: Boolean,
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
    timestamps: true  // Auto-adds createdAt and updatedAt
});
//endregion

/**
 * ============================================================================
 * METHOD: addToCart
 * ============================================================================
 * Adds a product to user's cart or updates quantity if already present.
 *
 * WORKFLOW:
 * 1. Validate product exists
 * 2. Check if product already in cart
 * 3. Fetch current inventory from Inventory collection
 * 4. Calculate total quantity needed (existing + new)
 * 5. Validate against available inventory
 * 6. Update cart (add new or update existing item)
 * 7. Save user document
 *
 * ⚠️ IMPORTANT: This does NOT decrease inventory!
 *    Inventory only decreases when order is placed (in placeOrder endpoint).
 *    Cart is just a "wish list" - items aren't reserved.
 *
 * @param {{productID: *, quantity: *}} productID - ID of product to add
 * @param {Number} amount - Quantity to add (default: 1)
 * @returns {Promise<User>} - Updated user document
 * @throws {Error} - If product not found, inventory insufficient, etc.
 */
//region ✅ addToCart Method
userSchema.methods.addToCart = async function (productID, amount = 1) {

    // Sanitize input: Convert negative amounts to positive
    amount = Math.abs(amount);

    // 1️⃣ Validate product exists
    const product = await ProductModel.findById(productID);
    if (!product) {
        throw new Error('Product not found');
    }

    // 2️⃣ Check if product already exists in cart
    const productIndex = this.cart.items.findIndex(
        item => item.productID.toString() === productID.toString()
    );

    // 3️⃣ Get current inventory (SINGLE SOURCE OF TRUTH)
    const inventoryDoc = await InventoryModel.findOne({ productID: productID });

    if (!inventoryDoc) {
        throw new Error('Inventory record not found for this product');
    }

    // 4️⃣ Calculate total quantity user wants
    let newQuantity = amount;
    if (productIndex >= 0) {
        // Product already in cart: add to existing quantity
        newQuantity = this.cart.items[productIndex].quantity + amount;
    }

    // 5️⃣ Validate against available inventory
    if (inventoryDoc.inventory < newQuantity) {
        throw new Error(
            `Not enough inventory. Only ${inventoryDoc.inventory} items available.`
        );
    }

    // 6️⃣ Prepare product details for cart
    const price = product.price;
    const images = product.images;
    const productName = product.name;
    const isOnSale = product.isOnSale;

    // 7️⃣ Update cart
    if (productIndex >= 0) {
        // Update existing cart item
        this.cart.items[productIndex].quantity = newQuantity;

        // Refresh product details (in case price/name/images changed)
        this.cart.items[productIndex].price = price;
        this.cart.items[productIndex].images = images;
        this.cart.items[productIndex].productName = productName;
        this.cart.items[productIndex].isOnSale = isOnSale;
    } else {
        // Add new item to cart
        this.cart.items.push({
            productID,
            quantity: amount,
            price,
            images,
            productName,
            isOnSale
        });
    }

    // 8️⃣ Save and return updated user
    return this.save();
};
//endregion

/**
 * ============================================================================
 * METHOD: removeFromCart
 * ============================================================================
 * Removes a product from user's cart completely.
 *
 * @param {ObjectId} productID - ID of product to remove
 * @returns {Promise<User>} - Updated user document
 */
//region ✅ removeFromCart Method
userSchema.methods.removeFromCart = function (productID) {
    // Filter out the item with matching productID
    this.cart.items = this.cart.items.filter(
        item => item.productID.toString() !== productID.toString()
    );
    return this.save();
};
//endregion

/**
 * ============================================================================
 * METHOD: updateCartItemQuantity
 * ============================================================================
 * Updates the quantity of an existing cart item.
 *
 * WORKFLOW:
 * 1. Find item in cart
 * 2. If new quantity ≤ 0, remove item from cart
 * 3. Fetch current inventory from Inventory collection
 * 4. Validate new quantity against available inventory
 * 5. Update quantity and refresh product details
 * 6. Save user document
 *
 * ⚠️ IMPORTANT: Always validates against current inventory before updating.
 *    This prevents users from increasing quantity beyond available stock.
 *
 * @param {ObjectId} productID - ID of product to update
 * @param {Number} newQuantity - New quantity (0 or negative removes item)
 * @returns {Promise<User>} - Updated user document
 * @throws {Error} - If product not in cart or insufficient inventory
 */
//region ✅ updateCartItemQuantity Method
userSchema.methods.updateCartItemQuantity = async function (productID, newQuantity) {

    // 1️⃣ Find the cart item
    const cartItemIndex = this.cart.items.findIndex(
        item => item.productID.toString() === productID.toString()
    );

    if (cartItemIndex < 0) {
        throw new Error('Product not found in cart');
    }

    // 2️⃣ Handle removal (quantity ≤ 0)
    if (newQuantity <= 0) {
        this.cart.items.splice(cartItemIndex, 1);
        return this.save();
    }

    // 3️⃣ Get current inventory (SINGLE SOURCE OF TRUTH)
    const inventoryDoc = await InventoryModel.findOne({ productID: productID });

    if (!inventoryDoc) {
        throw new Error('Inventory record not found');
    }

    // 4️⃣ Validate new quantity against available inventory
    if (newQuantity > inventoryDoc.inventory) {
        throw new Error(
            `Not enough inventory. Only ${inventoryDoc.inventory} items available.`
        );
    }

    // 5️⃣ Update quantity
    this.cart.items[cartItemIndex].quantity = newQuantity;

    // 6️⃣ Refresh product details (in case they changed)
    const product = await ProductModel.findById(productID);
    if (product) {
        this.cart.items[cartItemIndex].price = product.price;
        this.cart.items[cartItemIndex].images = product.images;
        this.cart.items[cartItemIndex].productName = product.name;
        this.cart.items[cartItemIndex].isOnSale = product.isOnSale;
    }

    // 7️⃣ Save and return updated user
    return this.save();
};
//endregion

/**
 * ============================================================================
 * METHOD: clearCart
 * ============================================================================
 * Removes all items from user's cart.
 * Typically called after successful order placement.
 *
 * @returns {Promise<User>} - Updated user document
 */
//region ✅ clearCart Method
userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};
//endregion

module.exports = mongoose.model('User', userSchema);

/**
 * ============================================================================
 * USAGE EXAMPLES
 * ============================================================================
 *
 * // Add product to cart
 * await user.addToCart(productID, 2);
 *
 * // Update quantity
 * await user.updateCartItemQuantity(productID, 5);
 *
 * // Remove product
 * await user.removeFromCart(productID);
 *
 * // Clear entire cart (after order)
 * await user.clearCart();
 *
 * ============================================================================
 * INVENTORY WORKFLOW
 * ============================================================================
 *
 * 1. User adds to cart:
 *    ✅ Validate inventory exists
 *    ❌ DON'T decrease inventory
 *
 * 2. User views cart:
 *    ✅ Fetch current inventory for each item
 *    ✅ Show updated stock levels
 *    ❌ DON'T modify cart or inventory
 *
 * 3. User places order:
 *    ✅ Final inventory check
 *    ✅ Decrease inventory atomically
 *    ✅ Create order record
 *    ✅ Clear user's cart
 *
 * ============================================================================
 */