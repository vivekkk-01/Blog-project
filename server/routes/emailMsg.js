const express = require("express")
const routes = express.Router()

const verifyToken = require("../middlewares/token/verifyToken")
const emailMsgControllers = require("../controllers/emailMsg")

routes.post("/", verifyToken, emailMsgControllers.sendEmailMsg)

module.exports = routes;