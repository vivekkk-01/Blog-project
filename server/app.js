require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const connectToDatabase = require("./database")
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    console.log(`Server listening to port: ${PORT}`)
    await connectToDatabase()
})