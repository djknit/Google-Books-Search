import React, { Component } from 'react';
import './style.css';
import api from '../../../utilities/api';

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
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      formMessage: 'You must create a username OR provide an e-mail address. You may also choose to do both. If you enter a username and an email address, you can use either to sign in. Usernames are case-sensitive; email addresses are not. If you provide an email, you will be able to use it to recover your password.',
      formMessageClass: 'help',
      hasSuccess: false
    };
  }

  submitForm(event) {
    event.preventDefault();
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const passwordVerify = document.getElementById('verify-password-input').value;
    //Next line helps shorten repeated value for setState below
    const formMessageClass = 'help is-danger';
    if (!username && !email) return this.setState({ formMessage: 'You must enter a username or email address.', formMessageClass });
    if (username && username.length < 4) return this.setState({ formMessage: 'Your username must be at least 4 characters long.', formMessageClass });
    if (email && !(/.+@.+\..+/.test(email))) return this.setState({ formMessage: 'The email address you entered is not valid.', formMessageClass });
    if (!password) return this.setState({ formMessage: 'You must create a password.', formMessageClass });
    if (password.length < 7) return this.setState({ formMessage: 'Your password must be at least 7 characters long.', formMessageClass });
    if (!passwordVerify) return this.setState({ formMessage: 'You must re-enter your password to verify it.', formMessageClass });
    if (password !== passwordVerify) return this.setState({ formMessage: 'Your passwords don\'t match.', formMessageClass });
    let newUser = { password };
    if (username) newUser.username = username;
    if (email) newUser.email = email;
    api.auth.createAccount(newUser)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.setState({
            formMessage: 'Success! Your account was created.',
            formMessageClass: 'help is-success',
            hasSuccess: true
          });
          this.props.logUserIn(res.data.user)
        }
        else {
          this.setState({
            formMessage: res.data.message || 'Account creation failed. Please try again.',
            formMessageClass
          });  
        }
      })
      .catch(err => console.log(err));

  }

  render() {
    return(
      <div id="createAccountModal" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>{this.state.hasSuccess ? 'Account Created!' : 'Create Account'}</p>
            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="content">
              <p className={this.state.formMessageClass} style={style.formInstructions}>{this.state.formMessage}</p>
            </div>
            <form id="new-user-form" style={style.form}>
              <div className="field">
                <label className="label" htmlFor="username-input" style={style.label}>Create a username</label>
                <div className="control has-icons-left">
                  <input id="username-input" className="input" placeholder="Your username..." disabled={this.state.hasSuccess} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                  <p className="help">4 characters minimum. Case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email-input" style={style.label}>And/or enter your email</label>
                <div className="control has-icons-left">
                  <input id="email-input" className="input" type="email" placeholder="Your email address..." disabled={this.state.hasSuccess} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <p className="help">Not case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="password-input" style={style.label}>Create a password</label>
                <div className="control has-icons-left">
                  <input id="password-input" className="input" type="password" placeholder="Your password..." disabled={this.state.hasSuccess} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <p className="help">7 characters minimum.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="verify-password-input" style={style.label}>Verify your password</label>
                <div className="control has-icons-left">
                  <input id="verify-password-input" className="input" type="password" placeholder="Your password..." disabled={this.state.hasSuccess} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-unlock"></i>
                  </span>
                </div>
              </div>
            </form>
            <div className="content">
              <p style={style.privacyMessage}>I will never share or sell your information.</p>
            </div>
          </section>
          <footer className="modal-card-foot buttons is-right">
            {!this.state.hasSuccess && <button onClick={this.submitForm} type="submit" form="new-user-form" className="button is-success">Create Account</button>}
            <button onClick={this.props.closeModal} className={this.state.hasSuccess ? "button is-success" : "button"}>{this.state.hasSuccess ? 'OK' : 'Cancel'}</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default createAccountModal;