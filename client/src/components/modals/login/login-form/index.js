import React from 'react';

export default ({
  usernameOrEmail,
  password,
  problemMessage,
  hasSuccess,
  hasProblems,
  hasUsernameOrEmailProblem,
  hasPasswordProblem,
  handleChange,
  isLoading,
  openPasswordResetModal
}) => {

  return (
    <>
      <p className="help">
        Enter the username or email address associated with your account.
        <br />
        Usernames are case-sensitive; email addresses are not.
      </p>
      {hasSuccess &&
        <div className="notification is-success has-shadow">
          <strong>Success!</strong> You're logged in.
        </div>
      }
      {hasProblems &&
        <div className="notification is-danger has-shadow">
          {problemMessage}
        </div>
      }
      <div className="field">
        <label className="label" htmlFor="username-or-email-input">Enter your username or email</label>
        <div className="control has-icons-left">
          <input
            id="username-or-email-input"
            name="usernameOrEmail"
            value={usernameOrEmail}
            placeholder="Your username or email address..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasUsernameOrEmailProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user-tag"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="login-password-input">Enter your password</label>
        <div className="control has-icons-left">
          <input
            id="login-password-input"
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
        </div>
      </div>
      <div className="content">
        {!hasSuccess &&
          <p>
            <span className="text-link" onClick={openPasswordResetModal}>Forgot your password?</span>
          </p>
        }
        <p>I will never share or sell your information.</p>
      </div>
    </>
  );
}