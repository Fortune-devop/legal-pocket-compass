const mongoose = require('mongoose');

const waitlistUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  waitlistedAt: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  },
  approvedAt: {
    type: Date
  },
  cognitoUserId: {
    type: String,
    sparse: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

waitlistUserSchema.index({ email: 1 });
waitlistUserSchema.index({ approved: 1 });
waitlistUserSchema.index({ status: 1 });
waitlistUserSchema.index({ waitlistedAt: -1 });

module.exports = mongoose.model('WaitlistUser', waitlistUserSchema); 