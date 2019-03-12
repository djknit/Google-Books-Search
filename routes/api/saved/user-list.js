const router = require('express').Router();

const controllers = require('../../../controllers');

controllers.Book.getMongoIdOfBookAndCreateNewRecordIfNecessary('tcSMCwAAQBAJ', () => console.log('callback'));

router.get(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    controllers.User.getBooksList(
      req.user._id,
      result => res.json(result)
    );
  }
);

router.post(
  '/',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    
  }
);

const addBookToList = (req, res, isLoggedIn) => {
  const { bookInfo, note } = req.body;
  if (!bookInfo) return res.json({
    success: false,
    message: 'Improperly formatted request. Missing "bookInfo".'
  });
  const currentUserId = isLoggedIn ? req.user._id : undefined;

  const sendResAfterAddingToList = result_ => result_._id ?
    res.json({
      success: true,
      message: 'Book added to your personal list.'
    }) :
    res.json({
      success: false,
      message: 'Unknown error when saving to list.'
    })

  controllers.Book.findByGoogleId(
    bookInfo.gId,
    result_1 => result_1 ?
      // (Book is already created in db)
      controllers.User.checkIfBookIsOnList(
        result_1._id,
        result_2 => result_2 ?
          res.json({
            success: false,
            message: 'That book is already on the list.'
          }) :
          controllers.PublicList.addBook(
            {
              mongoBookId: result_1._id,
              note,
              currentUserId
            },
            sendResAfterAddingToList
          )
      ) :
      // (Book not already in db)
      controllers.Book.create(
        bookInfo,
        result_3 => result_3._id ?
          controllers.PublicList.addBook(
            {
              mongoBookId: result_3._id,
              note,
              currentUserId
            },
            sendResAfterAddingToList
          ) :
          res.json({
            success: false,
            message: 'Improperly formatted book information.',
            errors: result_3.errors
          })
      )
  );
}

module.exports = router;