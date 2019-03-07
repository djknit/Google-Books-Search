const router = require('express').Router();

const bookController = require('../../controllers/Book');

router.post(
  '/public-list/guest',
  (req, res) => {
    bookController.addGuestChoiceToPublicList(
      req.body,
      result => res.json(result)
    );
  }
);

router.post(
  '/public-list',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    bookController.addGuestChoiceToPublicList(
      req.body,
      result => res.json(result)
    );
  }
);

router.get(
  '/public-list/guest',
  (req, res) => {
    bookController(
      req.body,
      result => res.json(result)
    );
  }
);

router.post(
  '/comment/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    console.log('\n\n')
    console.log(req.body)
    controllers.Post.addComment(
      req.user._id,
      req.body.postId,
      req.body.comment,
      result => res.json(result)
    );
  }
);

router.delete(
  '/comment/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.Post.deleteComment(
      req.user._id,
      req.body.postId,
      req.body.commentId,
      result => res.json(result)
    );
  }
);

module.exports = router;