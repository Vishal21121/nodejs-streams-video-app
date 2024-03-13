const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // filename should be custom made so that multiple files with same name does not exist in the server
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = { upload }