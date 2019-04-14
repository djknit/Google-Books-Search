const router = require('express').Router();

router.use('/public-list', require('./public-list'));
router.use('/user-list', require('./user-list'));

const controllers = require('../../../controllers');

router.get(
  '/check-if-saved/guest/:gId',
  (req, res) => {
    controllers.Book.findByGoogleId(
      req.params.gId,
      result => result ?
        controllers.PublicList.checkIfListContainsBook(
          result._id,
          result_2 => result_2 ?
            res.json({ publicList: true }) :
            res.json({ publicList: false })
          ,
          error => res.status(500).json({ error })
        ) :
        res.json({ publicList: false })
      ,
      error => res.status(500).json({ error })
    );
  }
);

router.get(
  '/check-if-saved/user/:gId',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.Book.findByGoogleId(
      req.params.gId,
      result => result ?
        controllers.PublicList.checkIfListContainsBook(
          result._id,
          result_2 => controllers.User.checkIfBookIsOnList(
            req.user._id,
            result._id,
            result_3 => res.json({
              publicList: result_2 != null,
              userList: result_3 != null
            }),
            error => res.status(500).json({ error })
          ),
          error => res.status(500).json({ error })
        ) :
        res.json({ publicList: false, userList: false })
      ,
      error => res.status(500).json({ error })
    );
  }
);

module.exports = router;