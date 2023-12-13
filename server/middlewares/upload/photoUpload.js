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

  const directoryPath = "public/images/profile";

  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    } catch (error) {
      console.error("Error creating directory:", error.message);
    }
  }

  fs.writeFile(
    path.join(directoryPath, req.file.filename),
    req.file.buffer,
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return next(err);
      }
    }
  );
  next();
};

const postPhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `post-${Date.now()}-${req.file.originalname}`;
  const directoryPath = "public/images/posts";

  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    } catch (error) {
      console.error("Error creating directory:", error.message);
    }
  }

  fs.writeFile(
    path.join(directoryPath, req.file.filename),
    req.file.buffer,
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return next(err);
      }
    }
  );
  next();
};

module.exports = { photoUpload, profilePhotoResize, postPhotoResize };
