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
    .catch(err => {
      let response = { success: false };
      console.log(err)
      if (err.code === 11000) response.message = "Duplicate email or username."
      response._message = err.message;
      response.errors = err.errors;
      callback(response);
    });
}

module.exports = {
  newAccount(user, callback) {
    user.username = user.username || user.email;
    console.log(user)
    if (!user.email && !user.username) return callback({
      success: false,
      message: 'You must supply a username or email.'
    });
    else if (!user.password) return callback({
      success: false,
      message: 'You must supply a password (min. 7 characters).'
    });
    else if (user.email) {
      user.lowerCaseEmail = user.email.toLowerCase();
      User.findOne({ lowerCaseEmail: user.lowerCaseEmail })
        .then(result =>
          result ?
          callback({
            success: false,
            message: 'There is already an account with that email.'
          }) :
          createAccount(user, callback)
        )
        .catch(err => callback({ success: false, error: err, message: 'Server error' }));
    }
    else createAccount(user, callback);
  },
  findByUsernameOrEmail(usernameOrEmail, callback) {
    console.log('\n\n' + '-#@-'.repeat(16));
    console.log(usernameOrEmail)
console.log('--!~~~~~~~~~~~'.repeat(8));
    User.findOne({ username: usernameOrEmail })
      .then(result1 => {
        if (result1) {
          callback({ success: true, user: result1 });
        }
        else User.findOne({ lowerCaseEmail: usernameOrEmail })
          .then(result2 => {
            if (result2) callback({ success: true, user: result2 });
            else callback({ success: false, message: 'Invalid username or email.' });
          })
          .catch(err => callback({ success: false, error: err }));
      })
      .catch(err => callback({ success: false, error: err }));
  },
  findById(userId, done) {
    User.findById(userId)
      .then(result => done(null, result))
      .catch(err => done(err, null));
  }
}

// x.findByUsernameOrEmail({ nameOrEmail: 'djknasty'}, result => {
//   console.log('\n\n' + '$ ** * *****'.repeat(15) + result);
//   console.log(result);
// });