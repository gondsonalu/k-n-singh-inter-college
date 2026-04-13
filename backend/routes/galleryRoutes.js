const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getAll);
router.post('/', protect, upload.single('image'), create);
router.put('/:id', protect, upload.single('image'), update);
router.delete('/:id', protect, remove);

module.exports = router;
