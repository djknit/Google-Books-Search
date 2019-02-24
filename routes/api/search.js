const router = require('express').Router();

const gBooksSearch = require('../../utilities/google-books-search');

router.get(
  '/:query',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const query = req.params.query;
    console.log('`'.repeat(40)+'\n');
    console.log(query);
    console.log('\n' + '`'.repeat(40));
    gBooksSearch.search(query)
      .then(results => {
        res.json(results);
      })
  }
);

module.exports = router;