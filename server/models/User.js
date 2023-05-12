const mongoose = require("mongoose")
const crypto = require("crypto")

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, "First name is required."]
    },
    lastName: {
        type: String,
        require: [true, "Last name is required."]
    },
    password: {
        type: String,
        require: [true, "Password is required."],
    },
    email: {
        type: String,
        require: [true, "Email is required."],
        unique: [true, "User with that email already exists."],
    },
    profilePhoto: {
        type: String,
        default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
    },
    postCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isFollowing: {
        type: Boolean,
        default: false
    },
    isUnfollowing: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Blogger"]
    },
    viewedBy: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    followers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    following: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    active: {
        type: Boolean,
        default: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    accountVerificationToken: String,
    accountVerificationTokenExpire: Date,
    bio: String,
}, { timestamps: true })

userSchema.methods.createVerificationToken = async function () {
    const verificationToken = crypto.randomBytes(32).toString('hex')
    this.accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex")
    this.accountVerificationTokenExpire = Date.now() + 30 * 60 * 1000
    return verificationToken
}

userSchema.methods.createPasswordResetToken = async function () {
    const verificationToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash("sha256").update(verificationToken).digest("hex")
    this.passwordResetTokenExpire = Date.now() + 30 * 60 * 1000 //10 minutes
    return verificationToken
}

module.exports = mongoose.model("User", userSchema)