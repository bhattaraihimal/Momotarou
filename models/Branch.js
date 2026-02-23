const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  googleMapUrl: { type: String }, // Embed or Link
  phone: { type: String },
  hours: { type: String },
  email: { type: String },
  description: { type: String },
  image: { type: String },
  sideImage: { type: String },
  slug: { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Branch', BranchSchema);
