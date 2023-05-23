const { validationResult } = require("express-validator")
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const crypto = require("crypto")
const sgMail = require("@sendgrid/mail")
const generateToken = require("../middlewares/token/generateToken")
const cloudinaryUploadImg = require("../utils/cloudinary")
const fs = require("fs")

exports.userRegister = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json(error.array()[0].msg)
        }
        const { email, password, firstName, lastName } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json("User with that email address already exists.")
        }
        const securedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: securedPassword
        })

        return res.status(201).json(newUser)

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json("Invalid email or password!")
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) return res.status(401).json("Invalid email or password!")
        return res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("posts")
        return res.json(users)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.json("User deleted successfully!")
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getProfile = async (req, res) => {
    try {
        if (req.params.userId.toString() !== req.user._id.toString()) {
            const user = await User.findById(req.params.userId).populate("posts viewedBy")
            if (user.viewedBy.find(user => user._id.toString() === req.user._id.toString())) {
                return res.json(user)
            } else {
                user.viewedBy.push(req.user._id)
                await user.save()
                return res.json(user)
            }
        }
        const user = await User.findById(req.params.userId).populate("posts viewedBy")
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateUser = async (req, res) => {
    try {
        if (req.user._id.toString() === req.params.userId.toString()) {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                ...req.body
            }, { new: true })
            return res.json(updatedUser)
        } else {
            return res.status(401).json("You're not authorized!")
        }
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const securedPassword = await bcrypt.hash(password, 10)
        const user = await User.findById(req.user._id)
        user.password = securedPassword;
        await user.save()
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateFollow = async (req, res) => {
    try {
        const { followId } = req.body;
        const loggedInUserId = req.user._id;
        const followedUser = await User.findById(followId)
        const loggedInUser = await User.findById(loggedInUserId)
        if (followedUser.followers.find(follower => follower.toString() === loggedInUserId.toString())) {
            return res.status(409).json("You already follow this user.")
        } else {
            followedUser.isFollowing = true;
            followedUser.followers.push(loggedInUserId)
            await followedUser.save()
        }

        if (loggedInUser.followings.find(follow => follow.toString() === followId.toString())) {
            return res.status(409).json("You already follow this user.")
        } else {
            loggedInUser.followings.push(followId)
            await loggedInUser.save()
        }

        return res.json(loggedInUser)

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateUnfollow = async (req, res) => {
    try {
        const { unfollowId } = req.body;
        const loggedInUserId = req.user._id;
        const unfollowedUser = await User.findById(unfollowId)
        const loggedInUser = await User.findById(loggedInUserId)
        let updatedUser;

        if (unfollowedUser.followers.find(follower => follower.toString() === loggedInUserId.toString())) {
            await User.findByIdAndUpdate(unfollowId, {
                $pull: { followers: loggedInUserId, },
                isFollowing: false
            }, { new: true })
        } else {
            return res.status(409).json("You don't follow this user.")
        }

        if (loggedInUser.followings.find(follow => follow.toString() === unfollowId.toString())) {
            updatedUser = await User.findByIdAndUpdate(loggedInUserId, {
                $pull: { followings: unfollowId }
            }, { new: true })
        } else {
            return res.status(409).json("You don't follow this user.")
        }

        return res.json(updatedUser)

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateBlock = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            isBlocked: true
        }, { new: true })
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.updateUnBlock = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            isBlocked: false
        }, { new: true })
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.generateVerificationToken = async (req, res) => {
    try {
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
        const user = await User.findById(req.user._id)
        const verificationToken = await user.createVerificationToken()
        await user.save()
        const emailUrl = `If you requested to verify your account, verify now within 10 minutes, otherwise the token will expire. <a href="http://127.0.0.1:5173/verify-account/${verificationToken}">Verify account</a>`
        const msg = {
            from: "chimnanivivek14@gmail.com",
            to: user.email,
            subject: "Verify your account!",
            html: emailUrl
        }

        await sgMail.send(msg)
        return res.json("Email sent successfully!")

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.userVerification = async (req, res) => {
    try {
        const { token } = req.body
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({ accountVerificationToken: hashedToken })
        if (!user) {
            return res.status(401).json("Enter a correct token")
        }
        if (!user.accountVerificationTokenExpire > new Date()) {
            return res.status(401).json("Token is expired, try again later.")
        }

        user.isAccountVerified = true;
        user.accountVerificationToken = undefined;
        user.accountVerificationTokenExpire = undefined;
        await user.save()
        return res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.forgotPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json("User with that email address doesn't exist.")
        const token = await user.createPasswordResetToken()
        await user.save()

        const resetUrl = `If you requested to reset your password, reset it now within 10 minutes, otherwise the token will expire. <a href="http://localhost:3000/verify-account/${token}">Verify account</a>`
        const msg = {
            from: "chimnanivivek14@gmail.com",
            to: user.email,
            subject: "Hey!",
            html: resetUrl
        }

        await sgMail.send(msg)
        return res.json(`A verification message is sent successfully to ${email}. Reset now within 10 minutes, ${resetUrl}.`)

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({ passwordResetToken: hashedToken })
        if (!user) {
            return res.status(401).json("Enter a correct token")
        }
        if (!user.passwordResetTokenExpire > new Date()) {
            return res.status(401).json("Token is expired, try again later.")
        }

        user.password = await bcrypt.hash(password, 10)
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpire = undefined;
        user.passwordChangedAt = new Date()
        await user.save()

        return res.json("Password changed successfully!")
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.uploadProfilePhoto = async (req, res, next) => {
    try {
        const localPath = `public/images/profile/${req.file.filename}`
        const cloudinaryImage = await cloudinaryUploadImg(localPath)
        const user = await User.findByIdAndUpdate(req.user._id, {
            profilePhoto: cloudinaryImage.url
        }, { new: true })
        fs.unlink(localPath, (err) => {
            if (err) {
                return next(err)
            }
        })
        res.json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}