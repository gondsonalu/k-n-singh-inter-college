const About = require('../models/About');
const { cloudinary } = require('../config/cloudinary');

exports.get = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json({ success: true, data: about });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await About.findOne();
      if (existing?.principalImagePublicId) {
        await cloudinary.uploader.destroy(existing.principalImagePublicId).catch(() => {});
      }
      data.principalImage = req.file.path;
      data.principalImagePublicId = req.file.filename;
    }
    if (data.achievements && typeof data.achievements === 'string') {
      try { data.achievements = JSON.parse(data.achievements); } catch (e) {}
    }
    if (data.stats && typeof data.stats === 'string') {
      try { data.stats = JSON.parse(data.stats); } catch (e) {}
    }
    if (data.contactInfo && typeof data.contactInfo === 'string') {
      try { data.contactInfo = JSON.parse(data.contactInfo); } catch (e) {}
    }
    let about = await About.findOne();
    if (!about) {
      about = await About.create(data);
    } else {
      about = await About.findByIdAndUpdate(about._id, data, { new: true, runValidators: true });
    }
    res.json({ success: true, data: about });
  } catch (error) { next(error); }
};
