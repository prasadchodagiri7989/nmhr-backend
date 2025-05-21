// routes/applicationRoutes.js
import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// @route   GET /api/applications/user/:id
// @desc    Get all applications submitted by a user
router.get('/user/:id', async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.params.id });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const { jobId, userId, name, email, resumeUrl, coverLetter } = req.body;

    if (!jobId || !userId || !name || !email || !resumeUrl) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const newApp = new Application({
      jobId,
      userId,
      name,
      email,
      resumeUrl,
      coverLetter,
    });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
