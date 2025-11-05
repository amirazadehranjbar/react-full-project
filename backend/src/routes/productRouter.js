const express = require("express");
const {ProductModel} = require("../models/productModel");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const productRouter = express.Router();

//region ✅ Admin only - Add product
productRouter.post(
    "/api/admin/product",
    authenticate,
    authorizeRole('admin'),
    async (req, res) => {
        try {
            const { name, price, inventory, targetInventory, categoryID, images, isOnSale } = req.body;

            const newProduct = new ProductModel({
                name,
                price,
                inventory,
                targetInventory,
                categoryID,
                images,
                isOnSale
            });

            const savedProduct = await newProduct.save();

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
    }
);
// endregion

//region ✅ Public route - Get products
productRouter.get("/api/user/product", async (req, res) => {
    try {
        const products = await ProductModel.find({});
        if(!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }
        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
});
// endregion

module.exports = productRouter;