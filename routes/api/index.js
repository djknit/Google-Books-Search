const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const booksRoutes = require('./books');
const searchRoutes = require('./search');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/books', booksRoutes);
router.use('/search', searchRoutes);

module.exports = router;