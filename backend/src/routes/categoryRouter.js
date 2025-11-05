const express = require("express");
const CategoryModel = require("../models/categoryModel");
const {authenticate, authorizeRole} = require("../middleware/authMiddleware");
const categoryRouter = express.Router();

//region ✅ Admin only - Add new category
categoryRouter.post(
    "/api/admin/category",
    authenticate,                    // First check if logged in
    authorizeRole('admin'),         // Then check if admin
    async (req, res) => {
        try {
            const {name, icon} = req.body;

            const category = await CategoryModel.findOne({name});
            if (category) {
                return res.status(400).json({
                    success: false,
                    message: "This category already exists"
                });
            }

            const newCat = new CategoryModel({
                name: name,
                icon: icon,
            });

            await newCat.save();

            return res.status(201).json({
                success: true,
                data: newCat,
                message: "Category created successfully"
            });

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message || "Something went wrong"
            });
        }
    }
);
// endregion

//region ✅ Public route - Get categories (anyone can access)
categoryRouter.get("/api/user/category", async (req, res) => {
    try {
        const category = await CategoryModel.find();
        if (!category || category.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No category found"
            });
        }
        return res.status(200).json(category);
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
});
// endregion

module.exports = categoryRouter;