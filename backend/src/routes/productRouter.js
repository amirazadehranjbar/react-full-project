// backend/src/routes/productRouter.js
const express = require("express");
const {ProductModel} = require("../models/productModel");
const productRouter = express.Router();

//region add product ADMIN
productRouter.post("/api/admin/product", async (req, res) => {
    try {

        const { name, price, inventory, targetInventory, categoryID, images, isOnSale } = req.body;

        // 1. Create the document
        const newProduct = new ProductModel({
            name,
            price,
            inventory,
            targetInventory,
            categoryID,
            images,
            isOnSale
        });

        // 2. SAVE IT TO DATABASE ← THIS WAS MISSING!
        const savedProduct = await newProduct.save();

        // 3. Return the saved version (with _id, timestamps, etc.)
        return res.status(201).json({
            success: true,
            data: savedProduct,
            message: "Product created successfully"
        });

    } catch (e) {
        console.error("Error creating product:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
});
// endregion

//region get product USER
productRouter.get("/api/user/product", async (req, res) => {

    try {
        const products = await ProductModel.find({});
        if(!products) return res.status(404).json({error: "Product not found"});
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json(e.message || "Something went wrong");
    }

})
// endregion

module.exports = productRouter;