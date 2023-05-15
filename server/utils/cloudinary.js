const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const cloudinaryUploadImg = async (file) => {
    try {
        const data = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return {
            url: data.secure_url
        }
    } catch (error) {
        next(error)
    }
}

module.exports = cloudinaryUploadImg;