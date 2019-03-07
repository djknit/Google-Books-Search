const router = require('express').Router();

const UserController = require('../../controllers/User');
const passport = require('../../config/server').passport;

router.get(
  '/test',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    res.json({
      success: true,
      message: 'You are authenticated.',
      user: req.user
    });
  }
);

router.post('/create', (req, res) => {
  UserController.newAccount(req.body, result => {
    if (result.success) {
      req.login(
        result.user,
        err => err ?
          res.json({ success: false, error: 'Error logging in.'})
          :
          res.json({ success: true, message: 'You\'re now logged in.', user:req.user })
      );
    }
    else res.json(result);
  });
});

router.post(
  '/login',
  passport.authenticate(
    'local',
    { failureRedirect: '/api/auth/fail', failureFlash: true }
  ),
  (req, res) => res.json({
    success: true,
    message: 'You\'re now logged in.',
    user: req.user
  })
);

router.post(
  '/logout',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    req.logout();
    res.json({
      success: true,
      message: 'Account logout was successful.'
    });
  }
);

router.get('/fail', (req, res) => {
  let response = {};
  const message = req.flash();
  if (message.error && message.error[0] === 'user') {
    response = {
      message: 'Username or email address not found.',
      problems: { usernameOrEmail: true }
    }
  }
  else if (message.error && message.error[0] === 'password') {
    response = {
      message: 'Incorrect password.',
      problems: { password: true }
    }
  }
  else {
    response = {
      message: 'Unknown error. You are not authenticated.',
      problems: {}
    }
  }
  response.success = false;
  res.status(401);
  res.json(response);
});

const async = require('async');
const crypto = require('crypto');
const sendPasswordResetEmail = require('../../utilities/nodemailer');

// source: http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
router.post('/forgotpassword', (req, res) => {
  // https://caolan.github.io/async/docs.html#waterfall 
  async.waterfall([
    done => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      UserController.findByEmail(req.body.email, (err, user) => {
        if (!user) return res.json({ error: 'No account is registered for that address.' });
        user.passwordResetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        user.save(err => done(err, req, res, token, user));
      });
    },
    sendPasswordResetEmail
  ], err => {
    if (err) return console.error(err);
  });
});

router.post('/resetpassword/', (req, res) => {
  UserController.resetPassword(
    req.body.token,
    req.body.newPassword,
    result => {
      if (!result) return res.json({ success: false, message: 'Invalid or expired token.'});
      else req.login(result, err => err ? res.json(err) : res.json({ success: true, message: 'Successful authentication.' }));
    }
  );
});

module.exports = router;