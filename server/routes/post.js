const express = require("express")
const routes = express.Router()

const verifyToken = require("../middlewares/token/verifyToken")
const postControllers = require("../controllers/post")
const { photoUpload, postPhotoResize } = require("../middlewares/upload/photoUpload")
const isBlockedUser = require("../middlewares/isBlockedUser")

routes.post("/", verifyToken, [
], photoUpload.single("image"), postPhotoResize, isBlockedUser, postControllers.createPost)

routes.get("/", postControllers.getPosts)

routes.get("/:postId", postControllers.getPost)

routes.put("/:postId", verifyToken, isBlockedUser, postControllers.updatePost)

routes.delete("/:postId", verifyToken, postControllers.deletePost)

routes.put("/likes/:postId", verifyToken, postControllers.toggleLike)

routes.put("/dislikes/:postId", verifyToken, postControllers.toggleDislike)

module.exports = routes;