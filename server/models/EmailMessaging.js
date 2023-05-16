const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const emailMsgSchema = new Schema({
    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    sentBy: {
        type: Schema.Types.ObjectId,
        require: true
    },
    isFlagged: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("EmailMsg", emailMsgSchema)
