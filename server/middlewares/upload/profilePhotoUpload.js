const multer = require("multer")
const sharp = require("sharp")
const path = require("path")

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb({
            message: "Unsupported file format."
        }, false)
    }
}

const profilePhotoUpload = multer({
    storage, fileFilter, limits: { fileSize: 3000000 },
})

const profilePhotoResize = async (req, res, next) => {
    if (!req.file) return res.json("Upload a file, please.")
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`
    await sharp(req.file.buffer).resize(250, 250).toFormat("jpeg").jpeg({ quality: 90 }).toFile(path.join(`public/images/profile/${req.file.filename}`))
    next()
}
module.exports = { profilePhotoUpload, profilePhotoResize }