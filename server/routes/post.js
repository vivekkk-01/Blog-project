const express = require("express")
const routes = express.Router()

const verifyToken = require("../middlewares/token/verifyToken")
const postControllers = require("../controllers/post")
const { photoUpload, postPhotoResize } = require("../middlewares/upload/photoUpload")

routes.post("/", verifyToken, [
], photoUpload.single("image"), postPhotoResize, postControllers.createPost)

routes.get("/", postControllers.getPosts)

routes.get("/:postId", postControllers.getPost)

routes.put("/:postId", verifyToken, postControllers.updatePost)

routes.delete("/:postId", verifyToken, postControllers.deletePost)

module.exports = routes;