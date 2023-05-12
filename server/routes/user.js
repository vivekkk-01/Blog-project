const express = require("express")
const routes = express.Router()
const { body } = require("express-validator")

const userControllers = require('../controllers/user')
const verifyToken = require("../middlewares/token/verifyToken")

routes.post("/register", [
    body("firstName").trim().not().isEmpty().withMessage("First name is required."),
    body("lastName").trim().not().isEmpty().withMessage("Last name is required."),
    body("email").trim().isEmail().withMessage("Enter a valid email address."),
    body("password").trim().isLength({ min: 8, max: 32 }).withMessage("Password should at least contain 8 characters.")
], userControllers.userRegister)

routes.post("/login", userControllers.userLogin)

routes.get("/", verifyToken, userControllers.getUsers)

routes.get("/:userId", userControllers.getUser)

routes.get("/profile/:userId", verifyToken, userControllers.getProfile)

routes.put("/password", verifyToken, userControllers.updatePassword)

routes.put("/follow", verifyToken, userControllers.updateFollow)

routes.put("/unfollow", verifyToken, userControllers.updateUnfollow)

routes.put("/block-user/:userId", verifyToken, userControllers.updateBlock)

routes.put("/unblock-user/:userId", verifyToken, userControllers.updateUnBlock)

routes.put("/:userId", verifyToken, userControllers.updateUser)

routes.delete("/:userId", userControllers.deleteUser)

module.exports = routes;