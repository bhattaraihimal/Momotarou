const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  preferredLocation: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Franchise', FranchiseSchema);
