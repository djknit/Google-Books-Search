const LocalStrategy = require('passport-local').Strategy;

const UserController = require('../controllers/User');

// Function to configure Passport
module.exports.configurePassport = passport => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'usernameOrEmail'
    },
    function (usernameOrEmail, password, done) {
      UserController.findByUsernameOrEmail(usernameOrEmail, result => {
        const { user, error } = result;
        if (error) return done(error);
        if (!user) {
          return done(null, false, { message: 'user' });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (isMatch) {
            user.password = undefined;
            user.lowerCaseEmail = undefined;
            user.passwordResetToken = undefined;
            user.resetTokenExpiration = undefined;
            user.verifyEmailToken = undefined;
            user.verifyEmailToken = undefined;
            user.unverifiedEmail = undefined;
            return done(null, user);
          }
          else return done(null, false, { message: 'password' });
        });
      });
    }
  ));
  
  // Functions used by Passport to serialize user ID and store in session.
  passport.serializeUser((user, done) => done(null, user._id));
  
  passport.deserializeUser((id, done) => {
    UserController.findById(id, done);
  });
}