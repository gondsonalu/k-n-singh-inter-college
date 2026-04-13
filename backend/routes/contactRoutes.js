const express = require('express');
const router = express.Router();
const { submit, getAll, markRead, remove } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', submit);
router.get('/', protect, getAll);
router.put('/:id/read', protect, markRead);
router.delete('/:id', protect, remove);

module.exports = router;
