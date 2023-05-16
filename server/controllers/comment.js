const Comment = require("../models/Comment")

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            user: req.user._id,
            post: req.params.postId,
            description: req.body.description
        })
        return res.json(comment)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
        return res.json(comments)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ post: req.params.postId, _id: req.params.commentId })
        return res.json(comment)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        comment.description = req.body.description;
        await comment.save()
        return res.json(comment)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId)
        return res.json(comment)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}