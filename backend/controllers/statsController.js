const Notice = require('../models/Notice');
const Faculty = require('../models/Faculty');
const Gallery = require('../models/Gallery');
const Course = require('../models/Course');
const ContactMessage = require('../models/ContactMessage');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [notices, faculty, gallery, courses, messages, unreadMessages] = await Promise.all([
      Notice.countDocuments(),
      Faculty.countDocuments(),
      Gallery.countDocuments(),
      Course.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
    ]);
    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);
    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
    res.json({
      success: true,
      data: {
        notices,
        faculty,
        gallery,
        courses,
        messages,
        unreadMessages,
        recentNotices,
        recentMessages,
      },
    });
  } catch (error) { next(error); }
};
