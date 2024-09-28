// models/Tour.js
const mongoose = require('mongoose');

const HotspotSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  panoramaUrl: {
    type: String,
    required: true
  },
  hotspots: [HotspotSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tour', TourSchema);