import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../../../utilities/api';

class createAccountModal extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.state = {
      showInstructions: true,
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    };
  }
  
  handleChange(event) {
    // source: https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitForm(event) {
    event.preventDefault();
    this.setState({ showInstructions: false });
    const { username, email, password, verifyPassword } = this.state;
    if (!username && !email) return this.setState({
      problemMessage: 'You must enter a username or email address.',
      hasProblems: true,
      hasUsernameProblem: true,
      hasEmailProblem: true,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    });
    if (username && username.length < 4) return this.setState({
      problemMessage: 'Your username must be at least 4 characters long.',
      hasProblems: true,
      hasUsernameProblem: true,
      hasEmailProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    });
    if (email && !(/.+@.+\..+/.test(email))) return this.setState({
      problemMessage: 'The email address you entered does not appear to be a valid.',
      hasProblems: true,
      hasUsernameProblem: false,
      hasEmailProblem: true,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    });
    if (!password) return this.setState({
      problemMessage: 'You must create a password.',
      hasProblems: true,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: true,
      hasVerifyPasswordProblem: true
    });
    if (password.length < 7) return this.setState({
      problemMessage: 'Your password must be at least 7 characters long.',
      hasProblems: true,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: true,
      hasVerifyPasswordProblem: true
    });
    if (!verifyPassword) return this.setState({
      problemMessage: 'You must re-enter your password to verify it.',
      hasProblems: true,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: true
    });
    if (password !== verifyPassword) return this.setState({
      problemMessage: 'Your passwords don\'t match.',
      hasProblems: true,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: true,
      hasVerifyPasswordProblem: true
    });
    this.setState({
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    });
    const newUser = {
      username: username || undefined,
      email: email || undefined,
      password
    };
    api.auth.createAccount(newUser)
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
            hasProblems: true,
            hasUsernameProblem: resData.problems.username,
            hasEmailProblem: resData.problems.email,
            hasPasswordProblem: resData.problems.password,
            hasVerifyPasswordProblem: resData.problems.verifyPassword
          });  
        }
      })
      .catch(err => this.setState({
          problemMessage: 'Unknown error.',
          hasProblems: true,
          hasUsernameProblem: false,
          hasEmailProblem: false,
          hasPasswordProblem: false,
          hasVerifyPasswordProblem: false
        })
      );
  }
  
  cancelForm() {
    this.setState({
      showInstructions: true,
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasUsernameProblem: false,
      hasEmailProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false
    });
    this.props.closeModal();
  }

  render() {
    const style = {
      cardHeader: this.state.hasSuccess ?
        { backgroundColor: '#20bc56' } :
        {}
      ,
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
      <div id="createAccountModal" className={this.props.isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={style.cardHeader}>
            {this.state.hasSuccess ?
              <>
                <p className="modal-card-title is-success">Account Created!</p>
                <Link onClick={this.cancelForm} to="/search" className="delete" aria-label="close" />
              </> :
              <>
                <p className="modal-card-title">Create Account</p>
                <button onClick={this.props.closeModal} className="delete has-shadow" aria-label="close" />
              </>
            }
          </header>
          <section className="modal-card-body">
            {this.state.showInstructions &&
              <p className="help" style={style.formInstructions}>
                You must create a username OR provide an e-mail address. You may also choose to do both. If you enter a username and an email address, you can use
                either to sign in. Usernames are case-sensitive; email addresses are not. If you provide an email, you will be able to use it to recover your password.
              </p>
            }
            {this.state.hasSuccess &&
              <div className="notification is-success has-shadow">
                <strong>Success!</strong> Your account was created.
                <br />You are now signed in.
              </div>
            }
            {this.state.hasProblems &&
              <div className="notification is-danger has-shadow" style={style.problemNotification}>
                {this.state.problemMessage}
              </div>
            }
            <form id="new-user-form" style={style.form}>
              <div className="field">
                <label className="label" htmlFor="username-input" style={style.label}>Create a username</label>
                <div className="control has-icons-left">
                  <input id="username-input" name="username" value={this.state.username} placeholder="Your username..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasUsernameProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                  <p className="help">4 characters minimum. Case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email-input" style={style.label}>And/or enter your email</label>
                <div className="control has-icons-left">
                  <input id="email-input" name="email" value={this.state.email} type="email" placeholder="Your email address..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasEmailProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <p className="help">Not case-sensitive.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="password-input" style={style.label}>Create a password</label>
                <div className="control has-icons-left">
                  <input id="password-input" name="password" value={this.state.password} type="password" placeholder="Your password..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasPasswordProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <p className="help">7 characters minimum.</p>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="verify-password-input" style={style.label}>Verify your password</label>
                <div className="control has-icons-left">
                  <input id="verify-password-input" name="verifyPassword" value={this.state.verifyPassword} type="password" placeholder="Retype your password..." onChange={this.handleChange} disabled={this.state.hasSuccess} className={this.state.hasVerifyPasswordProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'} />
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
            {this.state.hasSuccess ?
              <Link onClick={this.cancelForm} to="/search" className="button is-success">OK</Link> :
              <>
                <button onClick={this.submitForm} type="submit" form="new-user-form" className="button is-success">Submit</button>
                <button onClick={this.cancelForm} className="button">Cancel</button>
              </>
            }
          </footer>
        </div>
      </div>
    );
  }
}

export default createAccountModal; 