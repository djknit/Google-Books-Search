const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublicListSchema = new Schema({
  name: String,
  books: [new Schema({
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    timeAdded: Date,
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: [new Schema({
      body: String,
      time: Date,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    })]
  })]
});

const PublicList = mongoose.model('PublicList', PublicListSchema);

module.exports = PublicList;