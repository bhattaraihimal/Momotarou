const express = require('express');
const router = express.Router();
const Timeline = require('../models/Timeline');
const { protect } = require('../middleware');

// GET /api/timeline (Public)
router.get('/', async (req, res) => {
  try {
    const timeline = await Timeline.find({}).sort({ year: 1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/timeline (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const entry = new Timeline(req.body);
    const created = await entry.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/timeline/:id (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const entry = await Timeline.findById(req.params.id);
    if (entry) {
      Object.assign(entry, req.body);
      const updated = await entry.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Timeline entry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/timeline/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const entry = await Timeline.findById(req.params.id);
    if (entry) {
      await entry.deleteOne();
      res.json({ message: 'Timeline entry removed' });
    } else {
      res.status(404).json({ message: 'Timeline entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
