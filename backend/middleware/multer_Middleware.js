// config/multerConfig.js
const multer = require("multer");
const path = require("path");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Specify the directory to save the files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and the original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
