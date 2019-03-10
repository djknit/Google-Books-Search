const User = require("../models/User");

function createAccount(newUser, callback) {
  console.log(newUser)
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
    user.username = user.username || user.email;
    console.log(user)
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
        done(null, result)
      })
      .catch(err => done(err, null));
  },
  checkIfBookIsOnList(userId, mongoBookId, cb) {
    User.findById(userId)
      .where({ 'books.book': mongoBookId })
      .then(cb)
      .catch(cb)
  },
  addBookToList(userId, mongoBookId, cb) {
    User.findByIdAndUpdate(
      userId,
      { $push: { 'books.book': mongoBookId } }
    )
      .then(cb)
      .catch(cb)
  }
}