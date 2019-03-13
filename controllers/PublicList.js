const PublicList = require('../models/PublicList');
const Book = require('../models/Book');

module.exports = {
  getList: (cb, handleError) => PublicList.findOne({})
    .populate([{
      path: 'books.book'
    }, {
      path: 'books.addedBy',
      select: 'username email'
    }])
    .then(cb)
    .catch(handleError)
  ,
  checkIfListContainsBook: (mongoBookId, cb, handleError) => PublicList.findOne({ 'books.book': { _id: mongoBookId } })
    .then(cb)
    .catch(handleError)
  ,
  addBook({ mongoBookId, currentUserId, note }, cb, handleError) {
    this.checkIfListContainsBook(
      mongoBookId,
      result => {
        if (result) return cb({ success: false, message: 'Book is already on the public list.' });
        const rightNow = new Date();
        const listItem = {
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
          .then(result_2 => result_2 ?
            cb({
              success: true,
              message: 'Book added to public list.',
              publicList: result_2
            }) :
            cb({ success: false })
          )
          .catch(handleError)
      },
      handleError
    )
  }
}