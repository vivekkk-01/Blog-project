const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format.",
      },
      false
    );
  }
};

const photoUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3000000 },
});

const profilePhotoResize = async (req, res, next) => {
  if (!req.file) return res.json("Upload a file, please.");
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  const directoryPath = "../../public/images/profile";

  // Log to check if the directory exists
  console.log("Does the directory exist?", fs.existsSync(directoryPath));
  fs.writeFile(
    path.join(directoryPath, req.file.filename),
    req.file.buffer,
    (err) => {
      if (err) {
        console.log("Error:-", err);
        return next(err);
      }
    }
  );
  next();
};

const postPhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `post-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
};

module.exports = { photoUpload, profilePhotoResize, postPhotoResize };
