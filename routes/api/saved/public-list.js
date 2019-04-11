const router = require('express').Router();

const controllers = require('../../../controllers');

router.get(
  '/',
  (req, res) => {
    controllers.PublicList.getList(
      result => res.json(result),
      error => res.status(500).json({ error })
    );
  }
);

router.post(
  '/save/guest',
  (req, res) => {
    const { bookInfo, note } = req.body;
    if (!bookInfo || !bookInfo.gId) res.status(400).json({ message: 'Missing book information or missing Google Books Id' });
    controllers.Book.getMongoIdOfBookAndCreateNewRecordIfNecessary(
      bookInfo,
      result_1 => controllers.PublicList.addBook(
        {
          mongoBookId: result_1,
          note
        },
        result_2 => res.json(result_2),
        error => res.status(500).json({ error })
      ),
      error => res.status(500).json({ error })
    );
  }
);

router.post(
  '/save/user',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const { bookInfo, note } = req.body;
    if (!bookInfo || !bookInfo.gId) res.status(400).json({ message: 'Missing book information or missing Google Books Id' });
    controllers.Book.getMongoIdOfBookAndCreateNewRecordIfNecessary(
      bookInfo,
      result_1 => controllers.PublicList.addBook(
        {
          mongoBookId: result_1,
          currentUserId: req.user._id,
          note
        },
        result_2 => res.json(result_2),
        error => res.status(500).json({ error })
      ),
      error => res.status(500).json({ error })
    );
  }
);

router.post(
  '/comment/:listItemId',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.PublicList.addComment(
      req.params.listItemId,
      req.body.comment,
      req.user._id,
      result => res.json(result),
      err => res.status(500).json({ message: err })
    );
  }
);

router.delete(
  '/comment',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const { listItemId, commentId } = req.body;
    controllers.PublicList.deleteComment(
      listItemId,
      commentId,
      req.user._id,
      result => res.json(result),
      err => res.status(500).json({ message: err })
    );
  }
);

module.exports = router;