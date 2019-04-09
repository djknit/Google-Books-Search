const PublicList = require('../models/PublicList');
const Book = require('../models/Book');

module.exports = {
  getList: (cb, handleError) => PublicList.findOne({})
    .populate([{
      path: 'books.book'
    }, {
      path: 'books.addedBy',
      select: ['username', 'email', 'shareUsername', 'shareEmail']
    }])
    .then(res => {
      // Protect user information according to users` sharing preferences
      const books = res.books.map(book => {
        if (!book.addedBy) return book;
        console.log(book.addedBy)
        console.log(book.timeAdded.getTime());
        let bookCopy = {
          book: book.book,
          notes: book.notes,
          timeAdded: book.timeAdded.getTime()
        }
        if (book.addedBy.shareUsername) {
          bookCopy.addedBy = book.addedBy.username;
          return bookCopy;
        }
        if (book.addedBy.shareEmail) {
          bookCopy.addedBy = book.addedBy.email;
          console.log(bookCopy)
          console.log(bookCopy.addedBy)
          return bookCopy;
        }
        return bookCopy;
      });
      cb({ books });
    })
    .catch(err => console.log(err))
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