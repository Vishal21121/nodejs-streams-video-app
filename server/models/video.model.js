const mongoose = require("mongoose")

const VideoSchema = mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    }
})

const Video = mongoose.model("Video", VideoSchema)

module.exports = { Video }