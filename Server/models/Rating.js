// models/Rating.js
const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rating', RatingSchema);