// seedJobs.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/Job.js'; // Adjust path if necessary

dotenv.config(); // Load .env file to get MONGO_URI

// ✅ Remove __v, createdAt, updatedAt from the data — these are managed by MongoDB automatically
const jobs = [
  {
    title: "Electrical Technician",
    company: "NM HR Consultancy",
    location: "UAE",
    jobType: "full-time",
    description: "ITI with 4-6 years' experience in Oil & Gas Industry (in Lighting & Earthing Maintenance fields).",
    shortDescription: "Electrical Technician required for Oil & Gas Industry projects.",
    salary: "1600-1800 AED",
    tags: ["Electrical", "Maintenance", "Oil & Gas"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Painter",
    company: "NM HR Consultancy",
    location: "UAE",
    jobType: "full-time",
    description: "Experienced painters needed for commercial and residential painting projects. Immediate joiners preferred.",
    shortDescription: "Painter job in UAE with company benefits.",
    salary: "1200-1700 AED",
    tags: ["Painting", "Construction", "Residential"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Plumber",
    company: "NM HR Consultancy",
    location: "UAE",
    jobType: "full-time",
    description: "Experienced plumbers required for maintenance and pipeline installation projects.",
    shortDescription: "Plumber job in UAE with good pay and benefits.",
    salary: "1400 AED",
    tags: ["Plumbing", "Construction", "Maintenance"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "AC Technician",
    company: "NM HR Consultancy",
    location: "UAE",
    jobType: "full-time",
    description: "Skilled AC Technicians needed for installation and maintenance of air conditioning units.",
    shortDescription: "Job opening for AC Technicians in UAE.",
    salary: "1800 AED",
    tags: ["HVAC", "Maintenance", "Technician"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "General Helper",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "General Helper needed with any Gulf experience. Must be Indian nationality.",
    shortDescription: "General Helper in Abu Dhabi for Litco Company.",
    salary: "1100 AED",
    tags: ["Helper", "Labor", "Construction"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Pipe Fitter",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "Pipe Fitters with Gulf experience required for industrial work. Must be Indian nationality.",
    shortDescription: "Immediate openings for Pipe Fitters in Abu Dhabi.",
    salary: "1800-2200 AED",
    tags: ["Pipe Fitting", "Industrial", "Construction"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Rigger (Level 1 & 2)",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "Rigging License required. Any Gulf experience must. For ADNOC supplier.",
    shortDescription: "Rigger job openings in Abu Dhabi for ADNOC Supplier.",
    salary: "1500 AED",
    tags: ["Rigger", "ADNOC", "Oil & Gas"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Maintenance Foreman",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, Dubai",
    jobType: "full-time",
    description: "Foreman required for maintenance work. Must understand UAE labor laws and be responsible for supervising.",
    shortDescription: "Vacancy for Maintenance Foreman in Abu Dhabi/Dubai.",
    salary: "4000-5000 AED",
    tags: ["Foreman", "Supervisor", "Maintenance"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Scaffolder",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "Experienced scaffolders needed for assembling and dismantling scaffolding on construction sites.",
    shortDescription: "Scaffolding jobs available in Abu Dhabi.",
    salary: "1800-2000 AED",
    tags: ["Scaffolding", "Construction", "Labor"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Fabricator",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "Hiring Metal, Welder, Steel, and Pipe Fabricators with Gulf experience.",
    shortDescription: "Fabricator jobs available in Abu Dhabi.",
    salary: "2200 AED",
    tags: ["Fabrication", "Metal Work", "Welder"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Ductman Helper",
    company: "NM HR Consultancy",
    location: "Inside UAE",
    jobType: "full-time",
    description: "We are hiring Ductman Helpers with 2 years renewable contract. Includes food, accommodation, transportation, insurance, and visa as per UAE labor law. Overtime applicable.",
    shortDescription: "Hiring Ductman Helpers with company-provided benefits.",
    salary: "1300 AED/month",
    tags: ["HVAC", "Helper", "Construction"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  },
  {
    title: "Fruits & Vegetable Market Helper",
    company: "NM HR Consultancy",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    description: "Helpers needed for Fruits & Vegetable Market in Abu Dhabi. Age limit below 25. Requires Gulf experience and English reading skills. Interview online. Benefits include accommodation, visa, transportation, and insurance.",
    shortDescription: "Market Helpers required for grocery sector in Abu Dhabi.",
    salary: "1200 AED/month",
    tags: ["Market Helper", "General Labor", "Retail"],
    postedBy: "6651dcdc4c12ef39bc88e981",
    isActive: true
  }
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Job.deleteMany(); // Optional: remove existing jobs
    await Job.insertMany(jobs);

    console.log("✅ Jobs inserted successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
    process.exit(1);
  }
};

seedJobs();
