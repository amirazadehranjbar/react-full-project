const express = require("express");
const {ProductModel} = require("../models/productModel");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const inventoryRouter = express.Router();

//region ✅ Admin only - Get inventory data
inventoryRouter.get(
    "/api/admin/inventory",
    authenticate,
    authorizeRole('admin'),
    async (req, res) => {
        try {
            const products = await ProductModel.find({})
                .select("name inventory targetInventory categoryID");

            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found"
                });
            }

            return res.status(200).json(products);

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message || "Server Error"
            });
        }
    }
);
// endregion

module.exports = inventoryRouter;