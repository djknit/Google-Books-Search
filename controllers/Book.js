const Book = require('../models/Book');

module.exports = {
  addGuestChoiceToPublicList: (newBook, cb) => Book.findOne({ gId: newBook.gId })
    .then(result_1 => {
      if (result_1) return cb({ success: false, message: 'It appears that the book you are trying to add is already on the public list.' });
      Book.create(newBook)
        .then(result_2 => {
          console.log(result_2)
          cb(result_2);
        })
        .catch(err => cb({ success: false, message: err }))
      })
    .catch(err => cb({ success: false, message: err }))
}