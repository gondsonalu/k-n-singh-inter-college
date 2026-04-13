const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: '',
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  imagePublicId: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    enum: ['Campus', 'Events', 'Sports', 'Cultural', 'Labs', 'Library', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
