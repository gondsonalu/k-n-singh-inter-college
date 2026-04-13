const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  category: {
    type: String,
    enum: ['General', 'Exam', 'Admission', 'Event', 'Holiday', 'Result'],
    default: 'General',
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  attachment: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
