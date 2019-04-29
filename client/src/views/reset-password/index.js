import React, { Component } from 'react';
import './style.css';
import Hero from '../../components/hero';
import Box from '../../components/box';
import api from '../../utilities/api';

const defaultState = {
  password: '',
  verifyPassword: '',
  hasProblem: false,
  hasPasswordProblem: false,
  hasVerifyPasswordProblem: false,
  problemMessage: null,
  hasSuccess: false,
  hasError: false,
  isLoading: false,
  countdown: null
};

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.reportError = this.reportError.bind(this);
    this.reportSuccess = this.reportSuccess.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.state = defaultState;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submit(event) {
    event.preventDefault();
    const token = this.props.match && this.props.match.params && this.props.match.params.token;
    if (!token) return this.setState({
      hasError: true,
      hasProblem: false,
      hasVerifyPasswordProblem: true,
    })
    const { password, verifyPassword } = this.state;
    if (!password || !verifyPassword) return this.setState({
      hasError: false,
      hasProblem: true,
      hasPasswordProblem: !password,
      hasVerifyPasswordProblem: !verifyPassword,
      problemMessage: password ?
        'You must retype your password to verify it.' :
        'You must enter a password to continue'
    });
    if (password.length < 7) return this.setState({
      hasError: false,
      hasProblem: true,
      hasPasswordProblem: true,
      hasVerifyPasswordProblem: true,
      problemMessage: 'Your password must be at least seven (7) characters long.' +
        password !== verifyPassword ? '<br />Your passwords do not match.' : ''
    });
    if (password !== verifyPassword) return this.setState({
      hasError: false,
      hasProblem: true,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: true,
      problemMessage: 'Your passwords do not match.'
    });
    this.setState({
      hasError: false,
      isLoading: true,
      hasProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false,
      problemMessage: null
    });
    api.auth.resetPassword(token, password)
      .then(res => {
        console.log(res)
        if (!res || !res.data) return this.reportError(null);
        if (res.data.success) return this.reportSuccess(res.data.user);
        this.setState({
          isLoading: false,
          hasError: false,
          hasProblem: true,
          hasPasswordProblem: false,
          hasVerifyPasswordProblem: false,
          problemMessage: res.data.message || 'An unknown problem was encountered. Please try again or request another reset link.'
        })
      })
      .catch(this.reportError);
  }

  reportError(err) {
    this.setState({
      isLoading: false,
      hasError: true,
      hasPasswordProblem: false,
      hasProblem: false,
      hasVerifyPasswordProblem: false,
      problemMessage: err || 'An unknown error was encountered. Please try again or request another reset link.'
    });
  }

  reportSuccess(user) {
    this.setState({
      isLoading: false,
      hasSuccess: true,
      hasError: false,
      hasProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false,
      problemMessage: null,
      countdown: 6
    });
    this.props.setUser(user);
    const intervalId = setInterval(() => {
      let count = this.state.countdown;
      count--;
      this.setState({ countdown: count })
      if (count === 0) {
        clearInterval(intervalId);
        this.cancelForm();
        this.props.history.push('/search');
      }
    }, 1000);
  }

  cancelForm() {
    this.setState(defaultState);
  }

  render() {
    const boxStyle = {
      width: 500,
      maxWidth: '92%',
      minWidth: 320,
      margin: '30px auto 0',
      minHeight: 300
    }

    return(
      <div>
        <Hero pageName="Password Reset Page" />
        <Box className="is-deep" style={boxStyle}>
          <h4 className="title is-size-5">Choose a new password</h4>
          {(this.state.hasSuccess &&
            <div className="notification is-success has-shadow">
              <strong>Success!</strong> Your password has been reset.
              <br/>You are now logged in.
              <br />You will be redirected in {this.state.countdown} seconds.
            </div>
          ) || ((this.state.hasProblem || this.state.hasError) &&
            <div className="notification is-danger has-shadow">
              {this.state.hasError &&
                <strong>Error: </strong>
              }
              {this.state.problemMessage}
            </div>
          )}
          <form id="password-reset-form">
            <div className="field">
              <label className="label" htmlFor="password-input">Create a password</label>
              <div className="control has-icons-left">
                <input
                  id="password-input-reset"
                  name="password"
                  value={this.state.password}
                  type="password"
                  placeholder="Your password..."
                  onChange={this.handleChange}
                  disabled={this.state.hasSuccess || this.state.isLoading}
                  className={this.state.hasPasswordProblem && !this.state.hasSuccess ? 'input is-danger' : 'input'}
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
                  id="verify-password-input-reset"
                  name="verifyPassword"
                  value={this.state.verifyPassword}
                  type="password"
                  placeholder="Retype your password..."
                  onChange={this.handleChange}
                  disabled={this.state.hasSuccess || this.state.isLoading}
                  className={this.state.hasVerifyPasswordProblem && !this.state.hasSuccess ?
                    'input is-danger' : 'input'
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-unlock"></i>
                </span>
              </div>
            </div>
            <button type="submit" className="button is-success" onClick={this.submit}>Submit</button>
          </form>
        </Box>
      </div>
    );
  }
}

export default ResetPasswordPage;