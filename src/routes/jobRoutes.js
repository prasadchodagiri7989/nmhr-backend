// routes/jobRoutes.js
import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job (admin only)
// @access  Public or protected (add auth middleware later if needed)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType = 'full-time',
      description,
      shortDescription,
      salary,
      tags,
      postedBy,
    } = req.body;

    // ✅ Validation
    if (!title || !description || !location || !salary || !postedBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Create and save the job
    const newJob = new Job({
      title,
      company,
      location,
      jobType,
      description,
      shortDescription: shortDescription || description.substring(0, 120) + '...',
      salary,
      tags,
      postedBy,
    });

    const savedJob = await newJob.save();

    // ✅ Send response
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('❌ Error saving job:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the job
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Delete all applications for this job
    await Application.deleteMany({ jobId: id });

    res.status(200).json({ message: 'Job and associated applications deleted successfully', job });
  } catch (error) {
    console.error("❌ Error deleting job:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// PUT /api/jobs/:id — Update a job by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      company,
      location,
      jobType,
      description,
      shortDescription,
      salary,
      tags,
      isActive,
    } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        company,
        location,
        jobType,
        description,
        shortDescription,
        salary,
        tags,
        isActive,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('❌ Error updating job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;
