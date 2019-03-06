import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './style.css';
import api from '../../../utilities/api';

class SaveBookModal extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    // this.cancelForm = this.cancelForm.bind(this);
    // this.redirectAfterLogin = this.redirectAfterLogin.bind(this);
    this.state = {
      hasSuccess: false,
      isPublic: this.props.isPublic,
      book: this.props.book
    }
  }
  

  render() {
    let style = {};

    console.log(this.state.book)

    return (
      <div id="saveBookModal" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>
              Save to {this.state.isPublic ? 'Public' : 'Your Private'} List
            </p>
            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p className="help" style={style.formInstructions}>
              Enter the username or email address associated with your account.
              <br />
              Usernames are case-sensitive; email addresses are not.
            </p>
            {this.state.hasSuccess &&
              <div className="notification is-success">
                <strong>Success!</strong> You're logged in.
              </div>
            }
            {this.state.hasProblems &&
              <div className="notification is-danger" style={style.problemNotification}>
                {this.state.problemMessage}
              </div>
            }
            <form id="login-form" style={style.form}>
              <div className="field">
                <label className="label" htmlFor="username-or-email-input" style={style.label}>Enter your username or email</label>
                <div className="control has-icons-left">
                  <input id="username-or-email-input" name="usernameOrEmail" value={this.state.usernameOrEmail} placeholder="Your username or email address..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasUsernameOrEmailProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="login-password-input" style={style.label}>Enter your password</label>
                <div className="control has-icons-left">
                  <input id="login-password-input" name="password" value={this.state.password} type="password" placeholder="Your password..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasPasswordProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>
            </form>
            <div className="content">
              <p style={style.privacyMessage}>I will never share or sell your information.</p>
            </div>
          </section>
          {this.state.hasSuccess ?
            <footer className="modal-card-foot buttons is-right">
              <Link onClick={this.cancelForm} to="/search" className="button is-success">OK</Link>
            </footer>
            :
            <footer className="modal-card-foot buttons is-right">
              <button onClick={this.submitForm} type="submit" form="login-form" className="button is-success">Sign In</button>
              <button onClick={this.cancelForm} className="button">Cancel</button>
            </footer>
          }
        </div>
      </div>
    );
  } 
};

export default SaveBookModal;