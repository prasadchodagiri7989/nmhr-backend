import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Storage config with unique filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Route
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Example response to insert into DB
    const fileId = req.file.filename; // Save this in DB as resumeId or resumeUrl

    res.status(200).json({ resumeId: fileId, message: 'Resume uploaded successfully' });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;
