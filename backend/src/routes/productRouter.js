// backend/src/routes/productRouter.js
const express = require("express");
const { ProductModel } = require("../models/productModel");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const CategoryModel = require("../models/categoryModel");
const productRouter = express.Router();

//region ✅ Admin only - Add product with images
productRouter.post(
    "/api/admin/product",
    authenticate,
    authorizeRole('admin'),
    async (req, res) => {
        try {
            const { name, price, images ,inventory, targetInventory, categoryID, isOnSale } = req.body;

            const newProduct = new ProductModel({
                name,
                price: Number(price),
                inventory: Number(inventory),
                targetInventory: Number(targetInventory),
                categoryID,
                images,
                isOnSale: isOnSale === 'true'
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
//endregion

//region ✅ Admin only - Update product with new images
productRouter.put(
    "/api/admin/product/update",
    authenticate,
    authorizeRole('admin'),
    async (req, res) => {

        try {

            const { name, price, isOnSale ,productID , imageUrls} = req.body;

            const product = await ProductModel.findById(productID);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }



            // Update product
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productID,
                {
                    name: name || product.name,
                    price: price ? Number(price) : product.price,
                    images: imageUrls,
                    isOnSale: isOnSale !== undefined ? isOnSale === 'true' : product.isOnSale
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                data: updatedProduct,
                message: "Product updated successfully"
            });

        } catch (e) {
            console.error("Error updating product:", e);
            return res.status(500).json({
                success: false,
                message: e.message || "Something went wrong"
            });
        }
    }
);
//endregion

//region ✅ Admin only - Delete product and its images
productRouter.delete(
    "/api/admin/product/:id",
    authenticate,
    authorizeRole('admin'),
    async (req, res) => {
        try {
            const { id } = req.params;

            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            // Delete images from Cloudinary
            for (const imageUrl of product.images) {
                const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            await ProductModel.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Product and images deleted successfully"
            });

        } catch (e) {
            console.error("Error deleting product:", e);
            return res.status(500).json({
                success: false,
                message: e.message || "Something went wrong"
            });
        }
    }
);
//endregion

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
//endregion

//region ✅ Public route - Get products by category ID
productRouter.post("/api/user/products-in-category", async (req, res) => {
    try {
        const { categoryID } = req.body;

        const productsInCategory = await ProductModel.find({ categoryID: categoryID });
        const categoryName = await CategoryModel.findOne({ _id: categoryID }).select("name");

        if(!productsInCategory || !categoryName) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        return res.status(200).json({
            success: true,
            categoryName: categoryName.name,
            data: productsInCategory
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        })

    }
})
//endregion

//region✅ product details
productRouter.post("/api/user/products/details", async (req, res) => {

    const {productId} = req.body;

    if (!productId) {
        return res.status(404).json({success: false, message: "Products ID is missing"});
    }



});
//endregion

module.exports = productRouter;
