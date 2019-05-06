const router = require('express').Router();

const gBooksSearch = require('../../utilities/google-books-search');

router.post(
  '/:query',
  (req, res) => {
    const newestFirst = (req && req.body && req.body.newestFirst) || false;
    const query = req.params.query;
    gBooksSearch.search(query, newestFirst)
      .then(results => {
        res.json(results);
      })
      .catch(err => res.status(500).json({ error: err || 'Unknown error' }));
  }
);

module.exports = router;