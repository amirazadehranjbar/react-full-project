const express = require("express");
const CategoryModel = require("../models/categoryModel");
const categoryRouter = express.Router();

//region add new category by admin
categoryRouter.post("/api/admin/category", async (req, res) => {

    try {
        const {name, icon} = req.body;

        const category = await CategoryModel.findOne({name});
        if (category) {
            return res.status(500).json("this category already exists");
        }

        const newCat = new CategoryModel({
            name: name,
            icon: icon,
        });

        await newCat.save();

        return res.status(200).json(newCat);

    } catch (e) {
        return res.status(500).json(e.message || "Something went wrong");
    }
});
//endregion

// region get category
categoryRouter.get("/api/user/category", async (req, res) => {

    try {
        const category = await CategoryModel.find();
        if(!category) {
            return res.status(404).json("No category found");
        }
        return res.status(200).json(category);
    } catch (e) {
        return res.status(500).json(e.message || "Something went wrong");
    }

})
// endregion

module.exports = categoryRouter;