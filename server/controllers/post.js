const Post = require("../models/Post")
const Filter = require("bad-words")
const User = require("../models/User")
const cloudinaryUploadImg = require("../utils/cloudinary")
const fs = require("fs")

exports.createPost = async (req, res) => {
    try {
        const filter = new Filter()
        const isProfane = filter.isProfane(req.body.title, req.body.description)
        if (isProfane) {
            await User.findByIdAndUpdate(req.body.user, {
                isBlocked: true
            })
            return res.status(400).json("Creating post failed because your post contains profane words. Also, you've been blocked by the platform.")
        }
        const localPath = `public/images/posts/${req.file.filename}`
        const cloudinaryImage = await cloudinaryUploadImg(localPath)
        req.body.image = cloudinaryImage.url
        fs.unlink(localPath, (err) => {
            if (err) {
                return next(err)
            }
        })
        const user = await User.findById(req.user._id)
        user.postCount += 1;
        await user.save()
        req.body.user = req.user._id
        const post = await Post.create(req.body)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(error.message ? 403 : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user")
        return res.json(posts)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate("user")
        post.numViews += 1
        await post.save()
        return res.json(post)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.postId, { ...req.body, user: req.user._id }, { new: true })
        return res.json(post)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        return res.json(post)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}