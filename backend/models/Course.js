const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  duration: {
    type: String,
    trim: true,
  },
  eligibility: {
    type: String,
    trim: true,
  },
  seats: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['Arts', 'Science', 'Commerce', 'Vocational'],
    default: 'Arts',
  },
  subjects: [{
    type: String,
    trim: true,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
