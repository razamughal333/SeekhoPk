const express = require('express');
const router = express.Router();
const { updateLesson, deleteLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

router.put('/:id', protect, authorize('instructor', 'admin'), updateLesson);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteLesson);

module.exports = router;
