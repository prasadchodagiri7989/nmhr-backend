// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // omit password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
