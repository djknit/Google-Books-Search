const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  lowerCaseEmail: String,
  email: {
    type: String,
    // from bootcamp week 18 activity 15
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address.']
  },
  username: {
    type: String,
    validate: {
      validator: value => {
        if (value.length < 4) return false;
        return true;
      },
      message: 'Usernames must be at least 4 characters long.'
    },
    unique: true
  },
  password: {
    type: String,
    validate: {
      validator: value => {
        if (value.length < 7) return false;
        return true;
      },
      message: 'Passwords must be at least 7 characters long.'
    },
    required: true
  },
  passwordResetToken: String,
  resetTokenExpiration: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;