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
            await User.findByIdAndUpdate(req.user._id, {
                isBlocked: true
            })
            return res.status(400).json("Creating post failed because your post contains profane words. Also, you've been blocked by the platform.")
        }
        if (req.file) {
            const localPath = `public/images/posts/${req.file.filename}`
            const cloudinaryImage = await cloudinaryUploadImg(localPath)
            req.body.image = cloudinaryImage.url
            fs.unlink(localPath, (err) => {
                if (err) {
                    return next(err)
                }
            })
        }
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
        const category = req.query.category;
        if (category) {
            const posts = await Post.find({ category }).populate("user")
            return res.json(posts)
        } else {
            const posts = await Post.find().populate("user")
            return res.json(posts)
        }
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate("user likes dislikes comments")
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

exports.toggleLike = async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId)
        const user = req.user._id;
        const alreadyLiked = post.likes.find(userId => userId.toString() === user.toString())
        const alreadyDisliked = post.dislikes.find(userId => userId.toString() === user.toString())

        if (alreadyLiked) {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $pull: { likes: user },
            }, { new: true })
            return res.json(post)
        } else if (alreadyDisliked) {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $pull: { dislikes: user },
                $push: { likes: user }
            }, { new: true })
            return res.json(post)
        } else {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $push: { likes: user }
            }, { new: true })
            return res.json(post)
        }
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.toggleDislike = async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId)
        const user = req.user._id;
        const alreadyDisliked = post.dislikes.find(userId => userId.toString() === user.toString())
        const alreadyLiked = post.likes.find(userId => userId.toString() === user.toString())

        if (alreadyDisliked) {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $pull: { dislikes: user },
            }, { new: true })
            return res.json(post)
        } else if (alreadyLiked) {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $pull: { likes: user },
                $push: { dislikes: user }
            }, { new: true })
            return res.json(post)
        } else {
            post = await Post.findByIdAndUpdate(req.params.postId, {
                $push: { dislikes: user }
            }, { new: true })
            return res.json(post)
        }
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}