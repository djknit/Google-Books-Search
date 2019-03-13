const router = require('express').Router();

const controllers = require('../../../controllers');

router.get(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.User.getBooksList(
      req.user._id,
      result => res.json(result),
      error => res.status(500).json({ error })
    );
  }
);

router.post(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const { bookInfo, note } = req.body;
    if (!bookInfo || !bookInfo.gId) res.status(400).json({ message: 'Missing book information or missing Google Books Id' });
    controllers.Book.getMongoIdOfBookAndCreateNewRecordIfNecessary(
      bookInfo,
      result_1 => controllers.User.addBook(
        {
          mongoBookId: result_1,
          userId: req.user._id,
          note
        },
        result_2 => res.json(result_2),
        error => res.status(500).json({ error })
      ),
      error => res.status(500).json({ error })
    );
  }
);

module.exports = router;