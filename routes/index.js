const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/passwordreset', require('./passwordreset'));

module.exports = router;