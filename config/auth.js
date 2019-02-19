const LocalStrategy = require('passport-local').Strategy;

const UserController = require('../controllers/User');

// Function to configure Passport
module.exports.configurePassport = passport => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'usernameOrEmail'
    },
    function (usernameOrEmail, password, done) {
      require('../controllers/User').findByUsernameOrEmail(usernameOrEmail, result => {
        if (result.error) return done(result.error);
        const { user } = result;
        if (!user) {
          return done(null, false, { message: 'user' });
        }
        else if (user.password !== password) {
          return done(null, false, { message: 'password' });
        }
        else {
          user.password = undefined;
          user.lowerCaseEmail = undefined;
          done(null, user);
        }
      });
    }
  ));
  
  // Functions used by Passport to serialize user ID and store in session.
  passport.serializeUser((user, done) => done(null, user._id));
  
  passport.deserializeUser((id, done) => {
    UserController.findById(id, done);
  });
}