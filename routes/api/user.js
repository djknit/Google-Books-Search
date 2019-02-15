const router = require('express').Router();
const UserController = require('../../controllers/User');

router.get(
  '/search/:query',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.search(
      req.params.query,
      result => res.json(result)
    );
  }
);

router.get(
  '/posts',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.getUserPosts(
      req.user._id,
      result => res.json({
        userId: req.user._id,
        posts: result.posts,
        kbItems: result.kbItems,
        following: result.following
      })
    );
  }
);

router.get(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => res.json(req.user)
);

router.delete(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    UserController.delete(
      req.user._id,
      req.body.password,
      result => res.json(result)
    );
  }
);

module.exports = router;