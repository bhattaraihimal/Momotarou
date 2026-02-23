const express = require('express');
const router = express.Router();
const Franchise = require('../models/Franchise');
const { protect } = require('../middleware');

// POST /api/franchise (Public)
router.post('/', async (req, res) => {
  try {
    const franchise = new Franchise(req.body);
    await franchise.save();
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/franchise (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Franchise.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/franchise/:id (Mark read)
router.put('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Franchise.findById(req.params.id);
    if (inquiry) {
      inquiry.read = req.body.read !== undefined ? req.body.read : true;
      const updated = await inquiry.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/franchise/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Franchise.findByIdAndDelete(req.params.id);
    if (inquiry) {
      res.json({ message: 'Inquiry deleted successfully' });
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
