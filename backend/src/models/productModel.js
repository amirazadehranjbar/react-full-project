// backend/src/models/productModel.js
const mongoose = require('mongoose');
const {model} = require("mongoose");
const InventoryModel = require("./inventoryModel");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    inventory: {
        type: Number,
        default: 1,
    },

    targetInventory: {
        type: Number,
        default: 50,
    },

    categoryID: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },

    images:{
        type: Array,
    },

    isOnSale:{
        type: Boolean,
        default: false,
    }

});


//region✅ add inventory for new product method
productSchema.pre("save", async function (next) {

    try {
        const productID = this._id;
        const inventory = this.inventory;
        const  targetInventory = this.targetInventory;

        const newInventoryForNewProduct = await new InventoryModel({
            productID,
            inventory,
            targetInventory
        });

        await newInventoryForNewProduct.save();

        // next();

    } catch (e) {
        console.log(e);
    }

});
//endregion

const ProductModel = model("Products", productSchema);
module.exports.ProductModel = ProductModel;