import React, { Component } from 'react';
import './style.css';

const style = {
  formInstructions: {
    fontSize: 15
  },
  label: {
    textAlign: 'left'
  },
  formMessage: {
    margin: '15px 0 0',
    fontSize: 15
  },
  privacyMessage: {
    fontSize: 14,
    marginTop: 20
  },
  button: {
    marginTop: 15
  }
}

class createAccountModal extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = { formMessage: '' };
  }

  closeModal() {
    document.getElementById('createAccountModal').classList.remove('is-active');
  }

  submitForm(event) {
    event.preventDefault();
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const passwordVerify = document.getElementById('verify-password-input').value;
    const formMessageDisplay = document.getElementById('new-user-form-message');
    if (!username && !email) {
      formMessageDisplay.className = 'help is-danger';
      return this.setState({ formMessage: 'You must enter a username or email address.'});
    };
    if (username && username.length < 4) return this.setState({ formMessage: 'Your username must be at least 4 characters long.' });
    // if (email && ) return this.setState({ formMessage: 'Your username must be at least 4 characters long.' });
    if (!password) return this.setState({ formMessage: 'You must create a password.' });
    if (!passwordVerify) return this.setState({ formMessage: 'You must re-enter your password to verify it.' });
    // if (!) return this.setState({ formMessage: 'You must create a password.' });
    this.setState({ formMessage: 'success!'})
  }

  render() {
    return(
      <div id="createAccountModal" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create Account</p>
            <button onClick={this.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="content">
              <p style={style.formInstructions}>You must create a username OR provide an e-mail address. You may also choose to do both. If you enter a username and an email address, you can use either to sign in. Usernames are case-sensitive; email addresses are not. If you provide an email, you will be able to use it to recover your password.</p>
            </div>
            <form id="new-user-form" style={style.form}>
              <div className="field">
                <label className="label" htmlFor="username-input" style={style.label}>Create a username</label>
                <div className="control has-icons-left">
                  <input id="username-input" className="input" placeholder="Your username..." />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                  <p className="help">4 characters minimum. Case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email-input" style={style.label}>And/or enter your email</label>
                <div className="control has-icons-left">
                  <input id="email-input" className="input" type="email" placeholder="Your email address..." />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <p className="help">Not case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="password-input" style={style.label}>Create a password</label>
                <div className="control has-icons-left">
                  <input id="password-input" className="input" type="password" placeholder="Your password..." />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <p className="help">7 characters minimum.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="verify-password-input" style={style.label}>Verify your password</label>
                <div className="control has-icons-left">
                  <input id="verify-password-input" className="input" type="password" placeholder="Your password..." />
                  <span className="icon is-small is-left">
                    <i className="fas fa-unlock"></i>
                  </span>
                </div>
              </div>
            </form>
            <div className="content">
              <p id="new-user-form-message" style={style.formMessage}>{this.state.formMessage}</p>
              <p style={style.privacyMessage}>I will never share or sell your information.</p>
            </div>
          </section>
          <footer className="modal-card-foot buttons is-right">
            <button onClick={this.submitForm} type="submit" form="new-user-form" className="button is-success">Create Account</button>
            <button onClick={this.closeModal} className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default createAccountModal;