const express = require("express")
const routes = express.Router()

const verifyToken = require("../middlewares/token/verifyToken")
const categoryControllers = require("../controllers/category")

routes.get("/", verifyToken, categoryControllers.getCategories)

routes.get("/:categoryId", verifyToken, categoryControllers.getCategory)

routes.post("/", verifyToken, categoryControllers.createCategory)

routes.put("/:categoryId", verifyToken, categoryControllers.updateCategory)

routes.delete("/:categoryId", verifyToken, categoryControllers.deleteCategory)

module.exports = routes;