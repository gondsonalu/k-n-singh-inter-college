const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');

exports.getAll = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    const total = await Gallery.countDocuments(query);
    const items = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ success: true, data: items, total, pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
    const item = await Gallery.create({
      title: req.body.title || '',
      category: req.body.category || 'Other',
      image: req.file.path,
      imagePublicId: req.file.filename,
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Gallery.findById(req.params.id);
      if (existing?.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      }
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const item = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId).catch(() => {});
    }
    await item.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (error) { next(error); }
};
