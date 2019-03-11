const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/search', require('./search'));
router.use('/saved', require('./saved'));

module.exports = router;