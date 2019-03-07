const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  gId: String,
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  subtitle: String,
  publisher: String,
  description: String,
  image: String,
  authors: [String],
  language: String,
  isMature: Boolean,
  pageCount: Number,
  links: {
    preview: String,
    webReader: String,
    info: String
  },
  isbn: {
    isbn10: String,
    isbn13: String
  },
  viewability: String,
  dateAdded: Date
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;