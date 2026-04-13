const ContactMessage = require('../models/ContactMessage');

exports.submit = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    const contact = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) { next(error); }
};

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, isRead } = req.query;
    const query = {};
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
    ];
    if (isRead !== undefined) query.isRead = isRead === 'true';
    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ success: true, data: messages, total, pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
};

exports.markRead = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: msg });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) { next(error); }
};
