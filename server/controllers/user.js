const { validationResult } = require("express-validator")
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const generateToken = require("../middlewares/token/generateToken")

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
            email: user.email,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
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
        const user = await User.findById(req.params.userId)
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

        if (loggedInUser.following.find(follow => follow.toString() === followId.toString())) {
            return res.status(409).json("You already follow this user.")
        } else {
            loggedInUser.following.push(followId)
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

        if (loggedInUser.following.find(follow => follow.toString() === unfollowId.toString())) {
            updatedUser = await User.findByIdAndUpdate(loggedInUserId, {
                $pull: { following: unfollowId }
            }, { new: true })
        } else {
            return res.status(409).json("You don't follow this user.")
        }

        return res.json(updatedUser)

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}