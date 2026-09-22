const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/users', protect, authorize('admin'), getUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.get('/analytics', protect, authorize('admin'), getAnalytics);

module.exports = router;
