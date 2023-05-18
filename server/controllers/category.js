const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            user: req.user._id,
            title: req.body.title
        })
        return res.json(category)
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("user")
        return res.json(categories)
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId).populate("user")
        return res.json(category)
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)
        category.title = req.body.title
        await category.save()
        return res.json(category)
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId)
        return res.json(category)
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}
