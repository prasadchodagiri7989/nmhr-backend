import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract'],
      default: 'full-time',
    },
    description: { type: String },
    shortDescription: { type: String }, // ✅ Add this
    salary: { type: String },
    tags: [{ type: String }], // ✅ Add this
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // includes createdAt and updatedAt
);

export default mongoose.model('Job', jobSchema);
