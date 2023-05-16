const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    title: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)
