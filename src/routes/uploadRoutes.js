import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Google Drive Auth Setup
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}");

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Multer setup (temporary upload to ./uploads/)
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
});

// POST /api/resume
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Upload to Google Drive
    const fileMeta = {
      name: originalName,
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const uploadRes = await drive.files.create({
      requestBody: fileMeta,
      media,
      fields: 'id',
    });

    const fileId = uploadRes.data.id;

    // Make file public
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Build public links
    const viewLink = `https://drive.google.com/file/d/${fileId}/view`;
    const downloadLink = `https://drive.google.com/uc?id=${fileId}&export=download`;

    // Delete local temp file
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Resume uploaded successfully to Google Drive',
      fileId,
      viewLink,
      downloadLink,
    });
  } catch (err) {
    console.error('❌ Upload Error:', err);
    res.status(500).json({ message: 'Failed to upload resume', error: err.message });
  }
});

export default router;
