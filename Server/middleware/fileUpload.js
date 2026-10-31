// fileUpload.js

// Import required modules
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage configuration for multer
const storage = multer.diskStorage({
  // Set the destination for uploaded files
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and original extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Define file filter to restrict file types
const fileFilter = (req, file, cb) => {
  // Allow only specific file types (adjust as needed)
  const allowedFileTypes = /jpeg|jpg|png|gif|glb|gltf/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only image (jpeg, jpg, png, gif) and 3D model (glb, gltf) files are allowed!');
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
});

// Middleware for handling single file upload
const uploadSingleFile = upload.single('file');

// Middleware for handling multiple file uploads
const uploadMultipleFiles = upload.array('files', 5); // Allow up to 5 files

// Function to handle file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size is too large. Max limit is 10MB' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // An unknown error occurred
    return res.status(500).json({ error: err.message });
  }
  // If no error, move to the next middleware
  next();
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  handleUploadError
};