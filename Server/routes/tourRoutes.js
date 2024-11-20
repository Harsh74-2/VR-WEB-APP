// routes/tourRoutes.js
const express = require('express');
const multer = require('multer');
const Tour = require('../models/Tour');
const Comment = require('../models/Comment');
const Rating = require('../models/Rating');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all tours
router.get('/', async (req, res) => {
  try {
    const { query, location, category } = req.query;
    let filter = {};
    if (query) filter.title = new RegExp(query, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    const tours = await Tour.find(filter);
    res.json(tours);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a tour
router.post('/', [auth, upload.single('file')], async (req, res) => {
  try {
    const { title, location, category, tags } = req.body;
    const newTour = new Tour({
      title,
      location,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      fileUrl: req.file.path,
      creator: req.user.id
    });
    const tour = await newTour.save();
    res.status(201).json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      tour: req.params.id
    });
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get comments for a tour
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ tour: req.params.id }).populate('user', 'username');
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a rating
router.post('/:id/ratings', auth, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }
    const newRating = new Rating({
      value: req.body.value,
      user: req.user.id,
      tour: req.params.id
    });
    const rating = await newRating.save();
    res.status(201).json(rating);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get ratings for a tour
router.get('/:id/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find({ tour: req.params.id });
    res.json(ratings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;