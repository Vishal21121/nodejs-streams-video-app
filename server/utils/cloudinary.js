const { v2: cloudinary } = require('cloudinary')
const fs = require("fs")
const dotenv = require("dotenv");

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been successfully uploaded
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        console.log("got error", error)
        fs.unlinkSync(localFilePath) // removes the locally saved temporary file as the upload operation got failed
        return null
    }
}

module.exports = { uploadOnCloudinary }