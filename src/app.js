import express from 'express';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


import cors from 'cors';



const app = express();
// Allow requests from Vite frontend
const allowedOrigins = [
  'http://localhost:8080',
  'https://nm-hr.vercel.app',
  'https://nmhruae.com',
  'https://www.nmhruae.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
connectDB();
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

export default app;