require("dotenv").config()
const express = require("express")
const connectToDatabase = require("./database")
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors")

app.use(cors())
app.use(express.json())

const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")
const emailMsgRoutes = require("./routes/emailMsg")
const categoryRoutes = require("./routes/category")

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/email-message", emailMsgRoutes)
app.use("/api/category", categoryRoutes)

app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong, please try again!"
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json(message)
})

app.listen(PORT, async () => {
    console.log(`Server listening to port: ${PORT}`)
    await connectToDatabase()
})