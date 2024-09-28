const express = require('express');
const router = express.Router();
const { uploadSingleFile, handleUploadError } = require('../middleware/fileUpload');

router.post('/', uploadSingleFile, handleUploadError, (req, res) => {
  if (req.file) {
    res.json({ message: 'File uploaded successfully', file: req.file });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

module.exports = router;