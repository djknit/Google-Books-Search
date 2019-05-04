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
  }
);

module.exports = router;