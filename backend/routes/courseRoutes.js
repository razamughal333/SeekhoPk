const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { getLessonsByCourse, createLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);

// Lessons nested under a course
router.get('/:courseId/lessons', getLessonsByCourse);
router.post('/:courseId/lessons', protect, authorize('instructor', 'admin'), createLesson);

module.exports = router;
