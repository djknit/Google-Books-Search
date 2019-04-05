import React from 'react';

export default ({
  showInstructions,
  hasSuccess,
  hasProblems,
  problemMessage,
  username,
  email,
  handleChange,
  hasUsernameProblem,
  hasEmailProblem,
  password,
  verifyPassword,
  hasPasswordProblem,
  hasVerifyPasswordProblem,
  isLoading
}) => {
  
  return (
    <>
      {showInstructions &&
        <p className="help">
          You must create a username OR provide an e-mail address. You may also choose to do both. If you enter a username and an email address, you can use
          either to sign in. Usernames are case-sensitive; email addresses are not. If you provide an email, you will be able to use it to recover your password.
        </p>
      }
      {hasSuccess &&
        <div className="notification is-success">
          <strong>Success!</strong> Your account was created.
          <br />You are now signed in.
        </div>
      }
      {hasProblems &&
        <div className="notification is-danger">
          {problemMessage}
        </div>
      }
      <div className="field">
        <label className="label" htmlFor="username-input">Create a username</label>
        <div className="control has-icons-left">
          <input
            id="username-input"
            name="username"
            value={username}
            placeholder="Your username..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasUsernameProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user-tag"></i>
          </span>
          <p className="help">4 characters minimum. Case-sensitive.</p>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="email-input">And/or enter your email</label>
        <div className="control has-icons-left">
          <input id="email-input"
            name="email"
            value={email}
            type="email"
            placeholder="Your email address..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasEmailProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <p className="help">Not case-sensitive.</p>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="password-input">Create a password</label>
        <div className="control has-icons-left">
          <input
            id="password-input"
            name="password"
            value={password}
            type="password"
            placeholder="Your password..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasPasswordProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          <p className="help">7 characters minimum.</p>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="verify-password-input">Verify your password</label>
        <div className="control has-icons-left">
          <input
            id="verify-password-input"
            name="verifyPassword"
            value={verifyPassword}
            type="password"
            placeholder="Retype your password..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasVerifyPasswordProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-unlock"></i>
          </span>
        </div>
      </div>
      <div className="content">
        <p>I will never share or sell your information.</p>
      </div>
    </>
  );
}