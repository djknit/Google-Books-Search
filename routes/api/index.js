const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const booksRoutes = require('./books');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/books', booksRoutes);

module.exports = router;