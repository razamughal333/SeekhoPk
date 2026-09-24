const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses, completeLesson } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/enroll', protect, authorize('student'), enrollInCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.post('/complete-lesson', protect, authorize('student'), completeLesson);

module.exports = router;
