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