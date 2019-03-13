const Book = require('../models/Book');

module.exports = {
  create: (newBook, cb, handleError) => Book.create(newBook)
    .then(cb)
    .catch(handleError)
  ,
  findByGoogleId: (id, cb, handleError) => id ?
    Book.findOne({ gId: id })
      .then(cb)
      .catch(handleError)
    :
    cb(null)
  ,
  findByMongoId: (id, cb, handleError) => Book.findById(id)
    .then(cb)
    .catch(handleError)
  ,
  getMongoIdOfBookAndCreateNewRecordIfNecessary(bookInfo, cb, handleError) {
    if (!bookInfo || !bookInfo.gId) return cb(null);
    this.findByGoogleId(
      bookInfo.gId,
      result => result ?
        cb(result._id) :
        this.create(
          bookInfo,
          result => cb(result._id),
          handleError
        )
      ,
      handleError
    );
  }
}