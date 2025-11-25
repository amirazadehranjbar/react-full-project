const mongoose = require('mongoose');
const {model} = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    icon:{
        type: String,
        default: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-tag-icon-for-your-project-png-image_5214108.jpg',
    },

    model3D:{
        type:String,
        default:"/src/threeDModels/monitor.glb"
    }
});

const CategoryModel = model("Category", categorySchema);
module.exports = CategoryModel;