const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    validate: {
      validator: value => value === 'text' || value === 'content' || value === 'event',
      message: 'Valid types are "text", "content", and "event".'
    }
  },
  body: String,
  url: String,
  title: String,
  image: String,
  description: String,
  date: Date,
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  comments: [new Schema({
    body: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: Date
  })]
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;