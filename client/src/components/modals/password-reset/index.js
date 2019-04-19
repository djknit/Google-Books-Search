import React, { Component } from 'react';
import './style.css';
import api from '../../../utilities/api';
import ModalSkeleton from '../modal-skeleton';

const defaultState = {
  hasSuccess: false,
  isLoading: false,
  hasInputProblem: false,
  hasError: false,
  successMessage: null,
  problemMessage: null,
  errorMessage: null,
  emailInput: '',
};

class PasswordResetModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.state = defaultState;
  }

  handleChange(event) {
    this.setState({ emailInput: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    if (!this.props.isActive) return null;
    const email = this.state.emailInput.trim();
    if (!email) return this.setState({
      hasInputProblem: true,
      problemMessage: 'You must enter an email address to continue.'
    });
    this.setState({
      isLoading: true,
      hasInputProblem: false,
      problemMessage: null,
      hasError: false
    });
    api.auth.forgotPassword(email)
      .then(res => {
        console.log(res)
        if (res && res.data && res.data.success) {
          return this.setState({
            isLoading: false,
            hasSuccess: true,
            hasError: false,
            errorMessage: null,
            hasInputProblem: false,
            successMessage: res.data.message,
            problemMessage: null
          });
        }
        if (res && res.data) {
          return this.setState({
            isLoading: false,
            hasError: false,
            errorMessage: null,
            hasInputProblem: res.data.problem || false,
            successMessage: null,
            problemMessage: res.data.error || 'An unexpected problem was encountered. Please try again.'
          });
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          isLoading: false,
          hasError: true,
          hasInputProblem: false,
          errorMessage: (err && err.response && err.response.data && err.response.data.error) ||
            'An unknown error was encountered.'
        });
      })
  }

  cancelForm() {
    this.setState(defaultState);
    this.props.closeModal();
  }
  
  render() {
    return(
      <ModalSkeleton
        modalTitle="Request Password Reset"
        modalTitleSuccess="Password Reset Email Sent"
        BodyContent={
          <form id="request-password-reset-form" onSubmit={this.submitForm}>
            <p
              className={this.state.hasSuccess || this.state.hasInputProblem || this.state.hasError ?
                'help' : 'help is-size-5'
              }
            >
              Enter the email address associated with your account. You will receive an email with a link that will allow you to reset
              your password.
            </p>
            {this.state.hasSuccess ?
              <div className="notification is-success has-shadow">
                {this.state.successMessage || 'Success! Check your inbox for your password reset email.'}
              </div>
              :
              (this.state.problemMessage || this.state.hasError) ?
                <>
                  <div className="notification is-danger has-shadow">
                    {this.state.problemMessage || this.state.errorMessage || 'Unknown error.'}
                    {this.state.hasError &&
                      <>
                        <br />Sorry about that. You may want to try again.
                      </>
                    }
                  </div>
                  <p className="help">
                    If you continue to experience problems and you still wish to recover
                    your account, email me, Dave, at&nbsp;
                    <a href="mailto:djknit@gmail.com?subject=Book%20Search%20Support">
                      <span className="text-link">djknit@gmail.com</span>.
                    </a>
                  </p>
                </>
                :
                <div className="content">
                  <p className="help last-in-form">
                    If you signed up with only a username and do not have an email on file,
                    you will not be able to recover your password.
                  </p>
                </div>
            }
            <div className="field">
            <label className="label">Enter your email</label>
              <div className="control has-icons-left">
                <input
                  value={this.state.emailInput}
                  type="email"
                  placeholder="Your email address..."
                  onChange={this.handleChange}
                  disabled={this.state.hasSuccess || this.state.isLoading}
                  className={this.state.hasEmailProblem && !this.state.hasSuccess ?
                    'input is-danger' : 'input'
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <p className="help last-in-form">Not case-sensitive.</p>
              </div>
            </div>
          </form>
        }
        FooterContent={
          <button
            type="submit"
            form="request-password-reset-form"
            className="button is-success"
            disabled={this.state.isLoading}
          >
            Submit
          </button>
        }
        isModalActive={this.props.isActive}
        hasSuccess={this.state.hasSuccess}
        closeModal={this.props.closeModal}
        cancel={this.cancelForm}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError}
      >
      </ModalSkeleton>
    );
  }
}

export default PasswordResetModal;