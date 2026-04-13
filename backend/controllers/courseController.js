const Course = require('../models/Course');

exports.getAll = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) { next(error); }
};

exports.getOne = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    if (req.body.subjects && typeof req.body.subjects === 'string') {
      req.body.subjects = req.body.subjects.split(',').map(s => s.trim());
    }
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body.subjects && typeof req.body.subjects === 'string') {
      req.body.subjects = req.body.subjects.split(',').map(s => s.trim());
    }
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) { next(error); }
};
