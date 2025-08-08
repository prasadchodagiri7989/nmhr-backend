import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// CORS
app.use(cors({ origin: '*', credentials: true }));

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('hello world');
});

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use(errorHandler);

export default app;
