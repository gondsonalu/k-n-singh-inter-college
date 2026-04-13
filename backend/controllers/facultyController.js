const Faculty = require('../models/Faculty');
const { cloudinary } = require('../config/cloudinary');

exports.getAll = async (req, res, next) => {
  try {
    const { search, subject } = req.query;
    const query = {};
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { designation: { $regex: search, $options: 'i' } },
    ];
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    const faculty = await Faculty.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: faculty });
  } catch (error) { next(error); }
};

exports.getOne = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, data: faculty });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const faculty = await Faculty.create(data);
    res.status(201).json({ success: true, data: faculty });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Faculty.findById(req.params.id);
      if (existing?.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      }
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, data: faculty });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    if (faculty.imagePublicId) {
      await cloudinary.uploader.destroy(faculty.imagePublicId).catch(() => {});
    }
    await faculty.deleteOne();
    res.json({ success: true, message: 'Faculty deleted' });
  } catch (error) { next(error); }
};
