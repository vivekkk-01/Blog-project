require("dotenv").config()
const express = require("express")
const connectToDatabase = require("./database")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

const userRoutes = require("./routes/user")

app.use("/api/users", userRoutes)

app.listen(PORT, async () => {
    console.log(`Server listening to port: ${PORT}`)
    await connectToDatabase()
})