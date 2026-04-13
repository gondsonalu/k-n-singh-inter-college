const Notice = require('../models/Notice');

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await Notice.countDocuments(query);
    const notices = await Notice.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, data: notices, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
};

exports.getOne = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, data: notice });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, data: notice });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) { next(error); }
};
