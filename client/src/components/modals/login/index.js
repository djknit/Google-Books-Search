import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../../../utilities/api';

class loginModal extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    // this.redirectAfterLogin = this.redirectAfterLogin.bind(this);
    this.state = {
      usernameOrEmail: '',
      password: '',
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasUsernameOrEmailProblem: false,
      hasPasswordProblem: false,
    };
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitForm(event) {
    event.preventDefault();
    const { usernameOrEmail, password } = this.state;
    if (!usernameOrEmail) return this.setState({
      problemMessage: 'You must enter a username or email address.',
      hasProblems: true,
      hasUsernameOrEmailProblem: true,
      hasPasswordProblem: false
    });
    if (usernameOrEmail.length < 4) return this.setState({
      problemMessage: 'Invalid username or email. Usernames are at least 4 characters.',
      hasProblems: true,
      hasUsernameOrEmailProblem: true,
      hasPasswordProblem: false
    });
    if (!password) return this.setState({
      problemMessage: 'You must enter a password.',
      hasProblems: true,
      hasUsernameOrEmailProblem: false,
      hasPasswordProblem: true
    });
    if (password.length < 7) return this.setState({
      problemMessage: 'Invalid password. Passwords are at least 7 characters long.',
      hasProblems: true,
      hasUsernameOrEmailProblem: false,
      hasPasswordProblem: true,
    });
    this.setState({
      hasUsernameOrEmailProblem: false,
      hasPasswordProblem: false,
    });
    api.auth.login(usernameOrEmail, password)
      .then(res => {
        const resData = res.data;
        console.log(resData);
        if (resData.success) {
          this.setState({
            hasProblems: false,
            hasSuccess: true
          });
          this.props.logUserIn(resData.user);
        }
        else {
          this.setState({
            problemMessage: resData.message,
            hasProblems: true
          });
        }
      })
      .catch(err => {
        const resData = err.response.data;
        console.log(resData);
        this.setState({
          problemMessage: resData.message || 'Unknown error. Please try again.',
          hasProblems: true,
          hasUsernameOrEmailProblem: resData.problems.usernameOrEmail,
          hasPasswordProblem: resData.problems.password,
        });
      });
  }

  cancelForm() {
    this.setState({
      usernameOrEmail: '',
      password: '',
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasUsernameOrEmailProblem: false,
      hasPasswordProblem: false,
    });
    this.props.closeModal();
  }

  // redirectAfterLogin(event) {
  //   event.preventDefault();
  //   console.log('pre-push')
  //   this.props.history.push('/search')
  //   console.log('post-push')
  // }

  render() {
    const style = {
      formInstructions: {
        fontSize: 15,
        whiteSpace: 'pre-wrap',
        marginBottom: 20
      },
      label: {
        textAlign: 'left'
      },
      problemNotification: {
        whiteSpace: 'pre-line'
      },
      privacyMessage: {
        fontSize: 14,
        marginTop: 20
      },
      button: {
        marginTop: 15
      }
    }

    return(
      <div id="loginModal" className={this.props.isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>Sign In</p>
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
}

export default loginModal; 