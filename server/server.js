const express = require("express")
const cors = require("cors")
const fs = require("fs")
const dotenv = require("dotenv")
const { upload } = require("./middleware/multer.middleware.js")
const { uploadOnCloudinary } = require("./utils/cloudinary.js")
const { Video } = require("./models/video.model.js")
const { connectToDb } = require("./db/dbConfig.js")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

connectToDb()
app.use(cors())
// it handles form data
app.use(express.urlencoded({ extended: false }))

app.get("/:id", (req, res) => {
    const { id } = req.params
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoPath = `video-${id}.mp4`;
    const videoSize = fs.statSync(videoPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
})

app.post("/upload", upload.single("video"), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    if (req.file?.path) {
        try {
            const response = await uploadOnCloudinary(req.file?.path)
            if (response) {
                const videoInserted = await Video.create({ videoUrl: response.secure_url })
                return res.status(201).json({
                    success: true,
                    data: {
                        successCode: 201,
                        message: "video uploaded successfully"
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                data: {
                    successCode: 500,
                    message: error || "Internal server error"
                }
            })
        }

    }
    return res.status(500).json({
        success: false,
        data: {
            successCode: 500,
            message: error || "Internal server error"
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})