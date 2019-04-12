const PublicList = require('../models/PublicList');
const Book = require('../models/Book');

module.exports = {
  getList: (cb, handleError) => PublicList.findOne({})
    .populate([{
      path: 'books.book'
    }, {
      path: 'books.addedBy',
      select: ['username', 'email', 'shareUsername', 'shareEmail']
    }, {
      path: 'books.notes'
    }])
    .then(res => {
      console.log(res.books)
      // Protect user information according to users` sharing preferences
      const books = res.books.map(book => {
        const notes = book.notes.map(note => {
          let noteCopy = {
            body: note.body,
            time: note.time.getTime(),
            _id: note._id
          }
          if (note.user.shareUsername) {
            noteCopy.user = note.user.username;
            return noteCopy;
          }
          if (note.user.shareEmail) {
            noteCopy.user = note.user.email;
            return noteCopy;
          }
          return noteCopy;
        })
        if (!book.addedBy) return book;
        let bookCopy = {
          book: book.book,
          notes,
          timeAdded: book.timeAdded.getTime(),
          _id: book._id
        }
        if (book.addedBy.shareUsername) {
          bookCopy.addedBy = book.addedBy.username;
          return bookCopy;
        }
        if (book.addedBy.shareEmail) {
          bookCopy.addedBy = book.addedBy.email;
          return bookCopy;
        }
        return bookCopy;
      });
      cb({ books });
    })
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
  },
  addComment(listItemId, commentBody, userId, cb, handleError) {
    // source: https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument/26157458
    PublicList.findOneAndUpdate(
      { 'books._id': listItemId },
      {
        $set: {
          'books.$.notes': {
            $push: {
              body: commentBody,
              time: new Date(),
              user: userId
            }
          }
        }
      },
      { new: true }
    ).then(cb).catch(handleError);
  },
  deleteComment( listItemId, commentId, userId, cb, handleError) {
    PublicList.findByIdAndUpdate(
      listItemId,
      {
        $pull: {
          'books.notes': {
            _id: commentId,
            user: userId
          }
        }
      },
      { new: true }
    ).then(cb).catch(handleError);
  }
}