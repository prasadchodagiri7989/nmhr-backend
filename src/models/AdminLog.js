import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String }, // e.g. 'Deleted user', 'Updated job'
  targetType: { type: String }, // 'user', 'job', etc.
  targetId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: Object }, // optional: store request snapshot
}, { timestamps: true });

export default mongoose.model('AdminLog', adminLogSchema);
