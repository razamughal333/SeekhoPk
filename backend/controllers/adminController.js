const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route  GET /api/admin/users
// @access Private (Admin)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/admin/users/:id
// @access Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/admin/analytics
// @access Private (Admin)
const getAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, totalStudents, totalInstructors, totalCourses, totalEnrollments] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'student' }),
        User.countDocuments({ role: 'instructor' }),
        Course.countDocuments(),
        Enrollment.countDocuments(),
      ]);

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, deleteUser, getAnalytics };
