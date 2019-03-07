const router = require('express').Router();

const authRoutes = require('./auth');
const booksRoutes = require('./books');
const searchRoutes = require('./search');

router.use('/auth', authRoutes);
router.use('/books', booksRoutes);
router.use('/search', searchRoutes);

module.exports = router;