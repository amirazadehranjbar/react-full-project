const mongoose = require('mongoose');
const {model} = require("mongoose");


const inventorySchema = new mongoose.Schema({

    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },

    targetInventory: {
        type: Number,
        default: 20
    },

    inventory: {
        type: Number,
        default: 0
    },

}, {timestamps: true});


//region ✅ add inventory for new product method
inventorySchema.methods.createProduct = async (req, res) => {
}
//endregion

//regio✅ update product inventory
inventorySchema.methods.updateInventory = async (productID, quantity = 1) => {

    const productInventory = this.productID === productID;

}
//endregion


const InventoryModel = model("Inventory", inventorySchema);
module.exports = InventoryModel;