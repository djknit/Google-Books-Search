const PublicList = require('../models/PublicList');
const Book = require('../models/Book');

module.exports = {
  getList: cb => PublicList.findOne({})
    .populate([{
      path: 'books.book'
    }, {
      path: 'books.addedBy',
      select: 'username email'
    }])
    .then(cb)
    .catch(cb),
  // Doesn't prevent duplicates
  addBook: ({ mongoBookId, currentUserId, note }, cb) => {
    const rightNow = new Date();
    let listItem = {
      book: mongoBookId,
      timeAdded: rightNow,
      addedBy: currentUserId,
      notes: note ?
        {
          body: note,
          time: rightNow,
          user: currentUserId
        } :
        undefined
    }
    PublicList.findOneAndUpdate({}, { $push: { books: listItem } }, { new: true })
      .then(cb)
      .catch(cb)
  },
  checkIfListContainsBook: (mongoBookId, cb) => PublicList.findOne({ 'books.book': { _id: mongoBookId } })
    .then(cb)
    .catch(cb)
}