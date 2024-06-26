const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Post title is required."],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Post category is required."],
    },
    numViews: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2023/01/19/03/07/marble-7728244_960_720.jpg"
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

postSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "post",
    localField: "_id",
})

module.exports = mongoose.model("Post", postSchema)