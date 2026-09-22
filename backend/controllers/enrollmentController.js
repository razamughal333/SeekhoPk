const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @route  POST /api/enroll
// @access Private (Student)
const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'courseId is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/my-courses
// @access Private (Student)
const getMyCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
      path: 'course',
      populate: { path: 'instructor', select: 'name email' },
    });

    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

module.exports = { enrollInCourse, getMyCourses };
