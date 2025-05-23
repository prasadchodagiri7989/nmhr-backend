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

router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update an application (e.g., status)
router.put('/:id', async (req, res) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(updatedApp);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Failed to update application' });
  }
});

// @route   GET /api/applications
// @desc    Get all applications (admin only)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;
