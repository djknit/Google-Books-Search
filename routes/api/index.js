const router = require('express').Router();

const authRoutes = require('./auth');
const searchRoutes = require('./search');
const publicListRoutes = require('./public-list');
const userListRoutes = require('./user-list');

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/public-list', publicListRoutes);
// router.use('/user-list', userListRoutes);

module.exports = router;