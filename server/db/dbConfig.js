const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to mongodb: ${connection.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        process.exit(1)
    }
}

module.exports = { connectToDb }