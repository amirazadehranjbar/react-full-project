// backend/src/routes/inventoryRouter.js
const express = require("express");
const {authenticate, authorizeRole} = require("../middleware/authMiddleware");
const InventoryModel = require("../models/inventoryModel");
const inventoryRouter = express.Router();

//region ✅ Get inventory data
inventoryRouter.get(
    "/api/admin/inventory",
    authenticate,
    //authorizeRole,
    async (req, res) => {

        try {
            // Populate productID to get full product details including name and categoryID
            const data = await InventoryModel.find({})
                .populate('productID', 'name categoryID'); // Get product name and categoryID from Products collection

            if (!data || data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No inventory found"
                });
            }

            return res.status(200).json({success: true, data: data});

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message || "Server Error"
            });
        }
    }
);
// endregion

//region✅ Update product inventory
inventoryRouter.post("/api/admin/inventory/update", async (req, res) => {

    try {
        const {productID, amount} = req.body;

        await InventoryModel.findOneAndUpdate({productID: productID},
        { $inc: { "inventory": amount }},
            {new:true}
        );

        // Populate productID to get full product details including name and categoryID
        const newInventoryData = await InventoryModel.find({})
            .populate('productID', 'name categoryID'); // Get product name and categoryID from Products collection

        return res.status(200).json({success: true, message:"product inventory updated successfully" ,data: newInventoryData});

    } catch (e) {
        return res.status(500).json({success: false, message: e.message || "Server Error"});
    }

});
//endregion

module.exports = inventoryRouter;