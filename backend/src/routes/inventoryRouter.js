const express = require("express");
const {ProductModel} = require("../models/productModel");
const inventoryRouter = express.Router();

//get inventory data
inventoryRouter.get("/api/admin/inventory", async (req, res) => {

    try {
        const products = await ProductModel.find({})
            .select("name inventory targetInventory categoryID");

        if (!products || products.length === 0) {
            return res.status(404).json("No products found");
        }

        return res.status(200).json(products);

    } catch (e) {
        return res.status(500).json(e.message || "Server Error");
    }
});

module.exports = inventoryRouter;