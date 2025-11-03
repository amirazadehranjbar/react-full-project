// backend/src/models/productModel.js
const mongoose = require('mongoose');
const {model} = require("mongoose");

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
        required: true,
        min: 0,
    },

    targetInventory: {
        type: Number,
        required: true,
        min: 0,
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

const ProductModel = model("Products", productSchema);
module.exports.ProductModel = ProductModel;