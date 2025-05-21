import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Job from '../models/Job.js';

dotenv.config();

const __dirname = path.resolve(); // for ES modules
const jobsFilePath = path.join(__dirname, 'src','data', 'jobs.json');

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read jobs from file
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf-8'));

    // Optional: Clear previous jobs
    await Job.deleteMany();
    console.log('🧹 Cleared existing jobs');

    // Insert jobs
    const insertedJobs = await Job.insertMany(
      jobsData.map(job => ({
        ...job,
        postedBy: '6651dcdc4c12ef39bc88e981' // replace with valid ObjectId from your User collection
      }))
    );

    console.log(`✅ Inserted ${insertedJobs.length} jobs`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seedJobs();
