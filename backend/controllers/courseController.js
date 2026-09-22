const Course = require('../models/Course');

// @route  GET /api/courses
// @access Public
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/courses/:id
// @access Public
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/courses
// @access Private (Instructor, Admin)
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category || price === undefined) {
      return res.status(400).json({ message: 'Title, description, category and price are required' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id, // instructor is always the logged-in user
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/courses/:id
// @access Private (Instructor who owns it, or Admin)
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'You can only edit your own courses' });
    }

    const { title, description, category, price } = req.body;
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (category !== undefined) course.category = category;
    if (price !== undefined) course.price = price;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/courses/:id
// @access Private (Instructor who owns it, or Admin)
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'You can only delete your own courses' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
