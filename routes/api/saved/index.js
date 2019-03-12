const router = require('express').Router();

router.use('/public-list', require('./public-list'));
router.use('/user-list', require('./user-list'));

const controllers = require('../../../controllers');

router.get(
  '/check-if-saved/guest',
  (req, res) => {
    controllers.Book.findByGoogleId(req.body.gId)
      .then(result_1 => result_1 ?
        controllers.PublicList.checkIfListContainsBook(
          result_1._id,
          result_2 => result_2 ?
            res.json({ publicList: true }) :
            res.json({ publicList: false })
        ) :
        res.json({ publicList: false })
      )
      .catch(err => res.status(500).send());
  }
)

router.get(
  '/check-if-saved/user',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.Book.findByGoogleId(req.body.gId)
      .then(result_1 => result_1 ?
        0 :
        res.json({ })
      )
  }
)

module.exports = router;