const express = require('express');
const router = express.Router();
const { get, update } = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', get);
router.put('/', protect, upload.single('principalImage'), update);

module.exports = router;
