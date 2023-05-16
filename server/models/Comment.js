const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Post"
    },
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    description: {
        type: String,
        require: [true, "Description is required."],
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)
