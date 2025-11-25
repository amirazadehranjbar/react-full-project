// backend/src/routes/inventoryRouter.js
const express = require("express");
const {authenticate} = require("../middleware/authMiddleware");
const InventoryModel = require("../models/inventoryModel");
const inventoryRouter = express.Router();

//region ✅ Get inventory data
inventoryRouter.get(
    "/api/users/inventory",
    authenticate,
    async (req, res) => {
        try {
            const data = await InventoryModel.find({});

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
inventoryRouter.post("/api/inventory/update", async (req, res) => {

    try {
        const {productID, amount} = req.body;

        await InventoryModel.findOneAndUpdate({productID: productID},
        { $inc: { "inventory": amount }},
            {new:true}
        );

        const newInventoryData = await InventoryModel.find({});

        return res.status(200).json({success: true, message:"product inventory updated successfully" ,data: newInventoryData});

    } catch (e) {
        return res.status(500).json({success: false, message: e.message || "Server Error"});
    }

});
//endregion

module.exports = inventoryRouter;