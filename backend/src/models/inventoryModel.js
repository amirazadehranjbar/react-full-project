const mongoose = require('mongoose');
const {model} = require("mongoose");


const inventorySchema = new mongoose.Schema({

    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
    }
    
} , {timestamps: true});


const inventoryModel = model("Inventory", inventorySchema);