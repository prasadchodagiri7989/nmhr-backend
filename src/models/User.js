import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  id: String,
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  description: String,
  isCurrent: Boolean,
});

const educationSchema = new mongoose.Schema({
  id: String,
  institution: String,
  degree: String,
  field: String,
  startDate: String,
  endDate: String,
  description: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    avatar: { type: String },
    phone: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    location: { type: String },
    bio: { type: String },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: [experienceSchema],
      default: [],
    },
    education: {
      type: [educationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
