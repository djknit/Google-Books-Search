const Book = require('../models/Book');

module.exports = {
  create: (newBook, cb) => Book.create(newBook)
    .then(result => {
      console.log(result);
      cb(result);
    })
    .catch(err => {
      console.log(err);
      cb(err);
    })
  ,
  findByGoogleId: (id, cb) => Book.findOne({ gId: id })
    .then(result => {
      console.log(result);
      cb(result);
    })
    .catch(err => {
      console.log(err);
      cb(err);
    })
  ,
  findByMongoId: (id, cb) => Book.findById(id)
    .then(result => {
      console.log(result);
      cb(result);
    })
    .catch(err => {
      console.log(err);
      cb(err);
    })
}