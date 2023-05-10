const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectToDatabase;