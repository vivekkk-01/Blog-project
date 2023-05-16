const express = require("express")
const routes = express.Router()

const verifyToken = require("../middlewares/token/verifyToken")
const commentControllers = require("../controllers/comment")

routes.post("/:postId", verifyToken, commentControllers.createComment)

routes.get("/:postId", verifyToken, commentControllers.getComments)

routes.get("/:postId/:commentId", verifyToken, commentControllers.getComment)

routes.put("/:commentId", verifyToken, commentControllers.updateComment)

routes.delete("/:commentId", verifyToken, commentControllers.deleteComment)

module.exports = routes;