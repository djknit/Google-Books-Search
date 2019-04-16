const User = require("../models/User");

function createAccount(newUser, callback) {
  const user = new User(newUser);
  user.save((err, user) => {
  if (err) return callback({
      success: false,
      message: err.code === 11000 ? 'That username is taken.' : 'Unknown server error.',
      problems: err.code === 11000 ? { username: true } : {}
    });
    else if (user) {
      user.password = undefined;
      user.lowerCaseEmail = undefined;
      return callback({
        success: true,
        user
      });
    }
  callback({ success: false, message: 'Unexpected outcome. Reason unknown.' })
  });
}

module.exports = {
  newAccount(user, callback) {
    if (!user.email && !user.username) return callback({
      success: false,
      message: 'You must supply a username or email.',
      problems: { username: true, email: true }
    });
    else if (!user.password) return callback({
      success: false,
      message: 'You must supply a password (min. 7 characters).',
      problems: { password: true, verifyPassword: true }
    });
    else if (user.email) {
      user.lowerCaseEmail = user.email.toLowerCase();
      User.findOne({ lowerCaseEmail: user.lowerCaseEmail })
        .then(result => result ?
          user.username ? 
            User.findOne({ username: user.username })
              .then(result_2 => result_2 ?
                callback({
                  success: false,
                  message: 'That username is taken.\nThere is already an account for that email.',
                  problems: { email: true, username: true }
                }) :
                callback({
                  success: false,
                  message: 'There is already an account for that email.',
                  problems: { email: true }
                }))
            :
            callback({
              success: false,
              message: 'There is already an account for that email.',
              problems: { email: true }
            })
          :
          createAccount(user, callback)
        )
        .catch(err => callback({ success: false, error: err, message: 'Unknown server error.' }));
    }
    else createAccount(user, callback);
  },
  findByUsernameOrEmail(usernameOrEmail, callback) {
    User.findOne({ username: usernameOrEmail })
      .then(result1 => result1 ?
        callback({ success: true, user: result1 }) :
        User.findOne({ lowerCaseEmail: usernameOrEmail.toLowerCase() })
          .then(result2 => result2 ?
            callback({ success: true, user: result2 }) :
            callback({ success: false, message: 'Invalid username or email.' })
          )
          .catch(err => callback({ success: false, error: err }))
      )
      .catch(err => callback({ success: false, error: err }));
  },
  findByEmail(email, callback) {
    User.findOne({ lowerCaseEmail: email.toLowerCase() })
      .then(user => user ?
        callback(null, user) :
        callback('Email not found.', null)
      )
      .catch(err => callback(err, null))
  },
  findById(userId, done) {
    User.findById(userId)
      .then(result => {
        result.password = undefined;
        result.lowerCaseEmail = undefined;
        result.passwordResetToken = undefined;
        result.resetTokenExpiration = undefined;
        done(null, result);
      })
      .catch(err => done(err, null));
  },
  getBooksList(userId, cb, handleError) {
    User.findById(userId)
      .populate({
        path: 'books.book'
      })
      .then(cb)
      .catch(handleError);
  },
  checkIfBookIsOnList(userId, mongoBookId, cb, handleError) {
    User.findById(userId)
      .where({ 'books.book': mongoBookId })
      .then(cb)
      .catch(handleError);
  },
  addBookToList({ userId, mongoBookId, note }, cb, handleError) {
    this.checkIfBookIsOnList(
      userId,
      mongoBookId,
      result => {
        console.log(result + '\n\n\n')
        if (result) return cb({ success: false, message: 'Book is already on your list.' })
        const rightNow = new Date();
        const listItem = {
          book: mongoBookId,
          timeAdded: rightNow,
          notes: note ?
            [{
              body: note,
              time: rightNow
            }] :
            undefined
        }
        User.findByIdAndUpdate(
          userId,
          { $push: { 'books': listItem } }
        )
          .then(result_2 => result_2 ?
            cb({
              success: true,
              message: 'Book added to your personal list.'
            }) :
            cb({ success: false })
          )
          .catch(handleError);
      },
      handleError
    );
  },
  addComment(userId, listItemId, commentBody, cb, handleError) {
    const note = {
      body: commentBody,
      time: new Date()
    };
    User.findOneAndUpdate(
      {
        _id: userId,
        'books._id': listItemId
      }, {
        $push: {
          'books.$.notes': note
        }
      }, {
        new: true
      }
    ).populate('books.book')
      .then(res => res ? cb({ books: res.books }) : cb(res))
      .catch(handleError);
  },
  deleteComment(userId, listItemId, commentId, cb, handleError) {
    User.findOneAndUpdate(
      {
        _id: userId,
        'books._id': listItemId
      }, {
        $pull: {
          'books.$.notes': {
            _id: commentId
          }
        }
      }, {
        new: true
      }
    ).populate('books.book')
      .then(res => res ? cb({ books: res.books }) : cb(res))
      .catch(handleError);
  },
  removeBookFromList(userId, listItemId, cb, handleError) {
    User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          books: {
            _id: listItemId
          }
        }
      },
      { new: true }
    ).populate('books.book')
      .then(res => res ?
        cb({ books: res.books }) :
        handleError({ error: 'Unknown error while deleting book.'})
      )
      .catch(handleError);
  },
  updateSharingSettings(userId, shareUsername, shareEmail, cb, handleError) {
    User.findByIdAndUpdate(
      userId,
      { shareUsername, shareEmail }
    ).then(result_2 => result_2 ?
        cb({
          success: true,
          message: "You're privacy settings were successfully updated."
        }) :
        cb({ success: false })
      )
      .catch(handleError);
  }
}