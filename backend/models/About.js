const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  vision: {
    type: String,
    default: '',
  },
  mission: {
    type: String,
    default: '',
  },
  history: {
    type: String,
    default: '',
  },
  principalMessage: {
    type: String,
    default: '',
  },
  principalName: {
    type: String,
    default: '',
  },
  principalImage: {
    type: String,
    default: null,
  },
  achievements: [{
    title: String,
    description: String,
    year: String,
  }],
  stats: {
    established: { type: String, default: '1985' },
    students: { type: String, default: '2000+' },
    faculty: { type: String, default: '50+' },
    courses: { type: String, default: '15+' },
  },
  contactInfo: {
    address: { type: String, default: 'Masuriyapur, Azamgarh, Uttar Pradesh - 276001' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'info@knsingh.edu.in' },
    website: { type: String, default: 'www.knsingh.edu.in' },
  },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
