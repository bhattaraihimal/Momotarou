const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  year: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Timeline', TimelineSchema);
