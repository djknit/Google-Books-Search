import React from 'react';
import './style.css';

function createAccountModal(props) {
  const style = {
    formInstructions: {
      fontSize: 15
    },
    privacyMessage: {
      fontSize: 14,
      marginTop: 20
    },
    label: {
      textAlign: 'left'
    },
    button: {
      marginTop: 15
    }
  }

  return(
    <div id="loginModal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Sign In</p>
          <button onClick={props.closeModal} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <p style={style.formInstructions}>
              Enter the username or email address associated with your account.
              <br />
              Usernames are case-sensitive; email addresses are not.
            </p>
          </div>
          <form id="login-form" style={style.form}>
            <div className="field">
              <label className="label" htmlFor="user-login-input" style={style.label}>Enter your username or email</label>
              <div className="control has-icons-left">
                <input id="user-login-input" className="input" placeholder="Your username or email..."></input>
                <span className="icon is-small is-left">
                  <i className="fas fa-user-tag"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="password-login-input" style={style.label}>Enter your password</label>
              <div className="control has-icons-left">
                <input id="password-login-input" className="input" type="password" placeholder="Your password..."></input>
                <span className="icon is-small is-left">
                  <i className="fas fa-unlock"></i>
                </span>
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button onClick={props.closeModal} className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default createAccountModal;