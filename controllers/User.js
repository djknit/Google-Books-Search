const User = require("../models/User");

function createAccount(newUser, callback) {
  User.create(newUser)
    .then(result => {
      if (result) {
        result.password = undefined;
        result.lowerCaseEmail = undefined;
        callback({
          success: true,
          user: result
        });
      }
      else callback({ success: false });
    })
    .catch(err => callback({
      success: false,
      message: err.code === 11000 ? 'That username is taken.' : 'Unknown server error.',
      problems: err.code === 11000 ? { username: true } : {}
    }));
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
        User.findOne({ lowerCaseEmail: usernameOrEmail })
          .then(result2 => result2 ?
            callback({ success: true, user: result2 }) :
            callback({ success: false, message: 'Invalid username or email.' })
          )
          .catch(err => callback({ success: false, error: err }))
      )
      .catch(err => callback({ success: false, error: err }));
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
      .catch(handleError)
  },
  checkIfBookIsOnList(userId, mongoBookId, cb, handleError) {
    User.findById(userId)
      .where({ 'books.book': mongoBookId })
      .then(cb)
      .catch(handleError)
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
          { $push: { 'books': listItem } },
          { new: true }
        )
          .then(result_2 => result_2 ?
            cb({
              success: true,
              message: 'Book added to your personal list.',
              yourList: result_2
            }) :
            cb({ success: false })
          )
          .catch(handleError)
      },
      handleError
    );
  }
}