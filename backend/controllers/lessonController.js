const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @route  GET /api/courses/:courseId/lessons
// @access Public
const getLessonsByCourse = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/courses/:courseId/lessons
// @access Private (Instructor who owns the course, or Admin)
const createLesson = async (req, res, next) => {
  try {
    const { title, contentUrl, order } = req.body;

    if (!title || !contentUrl) {
      return res.status(400).json({ message: 'Title and content URL are required' });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'You can only add lessons to your own courses' });
    }

    let finalOrder = order;
    if (finalOrder === undefined) {
      const count = await Lesson.countDocuments({ course: req.params.courseId });
      finalOrder = count + 1;
    }

    const lesson = await Lesson.create({
      course: req.params.courseId,
      title,
      contentUrl,
      order: finalOrder,
    });

    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/lessons/:id
// @access Private (Instructor who owns the course, or Admin)
const updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const isOwner = lesson.course.instructor.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'You can only edit lessons on your own courses' });
    }

    const { title, contentUrl, order } = req.body;
    if (title !== undefined) lesson.title = title;
    if (contentUrl !== undefined) lesson.contentUrl = contentUrl;
    if (order !== undefined) lesson.order = order;

    await lesson.save();
    res.status(200).json(lesson);
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/lessons/:id
// @access Private (Instructor who owns the course, or Admin)
const deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const isOwner = lesson.course.instructor.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'You can only delete lessons on your own courses' });
    }

    await lesson.deleteOne();
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLessonsByCourse, createLesson, updateLesson, deleteLesson };
