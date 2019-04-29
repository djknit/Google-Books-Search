import React from 'react';
import './style.css';

export default ({
  property,
  isNew,
  currentValue,
  showInstructions,
  hasSuccess,
  hasProblem,
  problemMessages,
  successMessage,
  input1,
  input2,
  confirmPasswordInput,
  handleChange,
  hasInput1Problem,
  hasInput2Problem,
  isLoading,
  hasConfirmPasswordProblem
}) => {
  
  return (
    <>
      {showInstructions &&
        <>
          {property !== 'password' &&
            <>
              <p className="help">
                Your current {property} is <strong>{currentValue}</strong>.
              </p>
              <hr className="divider" />
            </>
          }
          <p className="help">
            {property === 'email' ?
              isNew ?
                <>Enter your email address.</>
                :
                <>
                  Enter your new email address.<br />
                  You will have to verify your new email to complete the process.
                </>
              :
              isNew ?
                <>Create a username.</>
                :
                <>Choose a new {property}.</>            
            }
            <br />
            You must also confirm your password in order to update your account info.
          </p>
        </>
      }
      {hasSuccess &&
        <div className="notification is-success has-shadow">
          {property === 'email' ?
            successMessage
            :
            <>
              <strong>Success!</strong> Your {property} has been updated.
            </>
          }
        </div>
      }
      {hasProblem &&
        <div className="notification is-danger has-shadow">
          {problemMessages.map(
            (message, index) =>
              <span key={message}>
                {index > 0 && <br />}
                {message}
              </span>
          )}
        </div>
      }
      <div className="field">
        <label className="label" htmlFor={`edit-${property}-input`}>Enter your new {property}.</label>
        <div className="control has-icons-left">
          <input
            id={`edit-${property}-input`}
            name="input1"
            value={input1}
            placeholder={`Your new ${property}...`}
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasInput1Problem && !hasSuccess ? 'input is-danger' : 'input'}
            type={(property === 'username' && 'text') || property}
          />
          <span className="icon is-small is-left">
            <i
              className={`fas fa-${
                (property === 'username' && 'user-tag') ||
                (property === 'email' && 'envelope') ||
                (property === 'password' && 'lock')
              }`}
            />
          </span>
          <p className="help">
            {
              (property === 'username' && <>4 characters minimum. Case-sensitive.</>) ||
              (property === 'email' && <>Not case-sensitive.</>) ||
              (property === 'password' && <>7 characters minimum.</>)
            }
          </p>
        </div>
      </div>
      {property === 'password' &&
        <div className="field">
          <label className="label" htmlFor="verify-edit-password-input">Verify your new password</label>
          <div className="control has-icons-left">
            <input
              id="verify-edit-password-input"
              name="input2"
              value={input2}
              type="password"
              placeholder="Retype your new password..."
              onChange={handleChange}
              disabled={hasSuccess || isLoading}
              className={hasInput2Problem && !hasSuccess ? 'input is-danger' : 'input'}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
      }
      <br />
      <hr className="divider" />
      <br />
      <div className="field">
        <label className="label" htmlFor={`confirm-password-edit-${property}-input`}>Enter your current password to confirm your identity.</label>
        <div className="control has-icons-left">
          <input
            id={`confirm-password-edit-${property}-input`}
            name="confirmPasswordInput"
            value={confirmPasswordInput}
            type="password"
            placeholder="Enter your current password..."
            onChange={handleChange}
            disabled={hasSuccess || isLoading}
            className={hasConfirmPasswordProblem && !hasSuccess ? 'input is-danger' : 'input'}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-unlock"></i>
          </span>
        </div>
      </div>
    </>
  );
}