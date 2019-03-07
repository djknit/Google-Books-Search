const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublicListSchema = new Schema({
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const PublicList = mongoose.model('PublicList', PublicListSchema);

module.exports = PublicList;