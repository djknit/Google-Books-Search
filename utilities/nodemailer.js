const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

// sources used: 1.) http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/  (Whole password reset process. Got most info from here.)
  // 2.) https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1  (For setting it up with gmail)
  // 3.) https://medium.com/@bobziroll/okay-so-i-havent-been-able-to-get-the-service-account-thing-to-work-but-i-ended-up-installing-38684d22811  (to help fix an issue i had with code from source 2)

  const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'djknit@gmail.com',
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
    accessToken
  }
});

const sendPasswordResetEmail = (req, res, token, user, done) => {
  const mailOptions = {
    to: user.email,
    from: 'djknit@gmail.com',
    subject: 'Book Search Password Reset',
    text: 'You are receiving this because you (or someone else) has requested to reset the password for your account on Dave\'s Book Search.\n\n' +
      'Please visit the following link to complete the process:\n\n' +
      'http://' + req.headers.host + '/reset-password/' + token + '\n\n' +
      'If you did not request this, you can ignore this email and your password will remain unchanged.\n\n' +
      'You may reply to this e-mail if you have any questions.\n\n' +
      'Thanks,\nDavid Knittel'
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    if (err) return done(err, 'done');
    return res.json({
      success: true,
      message: `Success! An e-mail has been sent to ${user.email} with further instructions.`
    });
  });
}

const sendEmailAddressVerificationEmail = (baseUrl, user, token, done) => {
  const mailOptions = {
    to: user.email,
    from: 'djknit@gmail.com',
    subject: 'Book Search: Verify Email',
    text: 'Please visit the following link to verify your email address for Dave\'s Book Search.\n\n' +
      'http://' + baseUrl + '/verify-email/' + token + '\n\n' +
      'If you did not request to use this email for an account on the Book Search, you can ignore this email and your address will not be used.\n\n' +
      'You may reply to this e-mail if you have any questions.\n\n' +
      'Thanks,\nDavid Knittel'
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    if (err) return done(err, false);
    done(null, true);
  });
}

module.exports = { sendPasswordResetEmail, sendEmailAddressVerificationEmail };