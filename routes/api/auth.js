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
      message: 'You are not authenticated.',
      problems: {}
    }
  }
  response.success = false;
  res.status(401);
  res.json(response);
});

router.post(
  '/privacy-settings',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const { shareUsername, shareEmail } = req.body;
    if (shareUsername === undefined || shareEmail === undefined)
      return res.status(400).json({
        message: 'Bad request format. Must specify "shareUsername" and "shareEmail".'
      });
    UserController.updateSharingSettings(
      req.user._id,
      shareUsername,
      shareEmail,
      result => res.json(result),
      err => res.status(500).json({ message: err || 'unknown error' })
    );
  }
);

router.post(
  '/verify-email/:token',
  (req, res) => {
    UserController.verifyEmail(
      req.params.token,
      result => {
        const { success, user, cleanUser } = result;
        if (success) return req.login(
          user,
          err => res.json({
            success,
            user: cleanUser,
            login: !err
          })
        );
        else res.json({
          success,
          user: cleanUser
        });
      },
      err => res.status(500).json({ message: err || 'unknown error' })
    );
  }
);

const async = require('async');
const crypto = require('crypto');
const {
  sendPasswordResetEmail,
  sendEmailAddressVerificationEmail
} = require('../../utilities/nodemailer');

router.post(
  '/edit-user-info',
  require('connect-ensure-login').ensureLoggedIn('/api/auth/fail'),
  (req, res) => {
    const { currentPassword, updatedInfo } = req.body;
    if (!currentPassword || !updatedInfo) {
      return res.status(400).json({
        message: 'Missing "currentPassword" and/or "updatedInfo".'
      });
    }
    if (updatedInfo.email) {
      UserController.setEmailVerificationToken(
        req.user._id,
        currentPassword,
        updatedInfo.email,
        req.headers.host,
        result => res.json(result),
        (err, status) => res.status(status || 500).json({ message: err || 'unknown error' })
      );
    }
    else {
      UserController.updateAccountInfo(
        req.user._id,
        currentPassword,
        updatedInfo,
        user => {
          if (!user) res.status(500).json({ message: 'user not found' });
          res.json({ user });
        },
        (err, status) => res.status(status || 500).json({ message: err || 'unknown error' })
      );
    }
  }
);

// source: http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
router.post('/forgotpassword', (req, res) => {
  // https://caolan.github.io/async/docs.html#waterfall 
  async.waterfall(
    [
      done => {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      (token, done) => {
        UserController.findByEmail(req.body.email, (err, user) => {
          if (!user) return res.json({ problem: true, error: 'Sorry, there is no account registered for that address.' });
          if (err) return res.json({ error: err });
          user.passwordResetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          user.save(err => done(err, req, res, token, user));
        });
      },
      sendPasswordResetEmail
    ],
    err => {
      if (err) return console.error(err);
      res.status(500).json({ error: err })
    }
  );
});

router.post('/resetpassword/', (req, res) => {
  UserController.resetPassword(
    req.body.token,
    req.body.newPassword,
    result => {
      if (!result) return res.json({ success: false, message: 'Invalid or expired token.'});
      else req.login(
        result,
        err => {
          if (err) return res.json({ success: false, message: err });
          const user = req.user;
          user.password = undefined;
          user.passwordResetToken = undefined;
          user.resetTokenExpiration = undefined;
          user.lowerCaseEmail = undefined;
          res.json({ success: true, message: 'Successful authentication.', user });
        }
      );
    },
    err => res.json({ success: false, message: err })
  );
});

module.exports = router;