import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import EditUserForm from './edit-user-form';
import api from '../../../../utilities/api';

const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  isLoading: false,
  problemMessages: [],
  successMessage: null,
  input1: '',
  input2: '',
  confirmPasswordInput: '',
  hasInput1Problem: false,
  hasInput2Problem: false,
  hasConfirmPasswordProblem: false
};

class GenericEditAccountInfoModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.state = defaultState;
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitForm(event) {
    event.preventDefault();
    const { property } = this.props;
    let { input1, input2, confirmPasswordInput } = this.state;
    if (property ===  'username' || property === 'email') input1 = input1.trim();
    let hasInput1Problem, hasInput2Problem, hasConfirmPasswordProblem;
    let problemMessages = [];
    if (!input1) {
      hasInput1Problem = true;
      problemMessages.push(`The ${property} field cannot be empty.`);
    }
    else if (property === 'username') {
      if (input1.length < 4) {
        hasInput1Problem = true;
        problemMessages.push('Your username must be at least 4 characters long.');
      }
    }
    else if (property === 'email') {
      if (!(/.+@.+\..+/.test(input1))) {
        hasInput1Problem = true;
        problemMessages.push('The email address you entered does not appear to be a valid address');
      }
    }
    else if (property === 'password') {
      if (input1.length < 7) {
        hasInput1Problem = true;
        hasInput2Problem = true;
        problemMessages.push('Your password must be at least 7 characters long.');
      }
      if (!input2) {
        hasInput2Problem = true;
        problemMessages.push('You must retype your new password to confirm it.');
      }
      else if (input1 !== input2) {
        hasInput1Problem = true;
        hasInput2Problem = true;
        problemMessages.push('Your passwords don\'t match.');
      }
    }
    if (!confirmPasswordInput) {
      hasConfirmPasswordProblem = true;
      problemMessages.push(
        'You must enter your current password to verify your identity before making changes to your account.'
      );
    }
    if (problemMessages.length > 0) {
      return this.setState({
        hasProblem: true,
        problemMessages,
        hasInput1Problem,
        hasInput2Problem,
        hasConfirmPasswordProblem
      });
    }
    else {
      this.setState({
        hasProblem: false,
        problemMessages,
        hasInput1Problem: false,
        hasInput2Problem: false,
        hasConfirmPasswordProblem: false,
        isLoading: true
      });
      api.auth.editUserInfo(
        { [this.props.property]: this.state.input1 },
        this.state.confirmPasswordInput
      )
        .then(res => {
          console.log(res);
          if (this.props.property === 'email') {
            const success = res && res.data && res.data.success;
            this.setState({
              hasSuccess: success,
              hasProblem: !success,
              hasInput1Problem: false,
              hasConfirmPasswordProblem: res && res.data && res.data.passwordProblem,
              isLoading: false,
              problemMessages: [!success && (res.data.message || 'Unknown error. Please try again.')],
              successMessage: success && (res.data.message || 'Please check your inbox for your verification email in order to complete the process.')
            });
          }
          else if (res && res.data && res.data.user) {
            this.setState({
              hasSuccess: true,
              hasProblem: false,
              hasInput1Problem: false,
              hasInput2Problem: false,
              hasConfirmPasswordProblem: false,
              isLoading: false,
              problemMessages: []
            });
            this.props.setUser(res.data.user);
          }
          else this.setState({
            hasProblem: true,
            hasInput1Problem: false,
            hasInput2Problem: false,
            hasConfirmPasswordProblem: false,
            isLoading: false,
            problemMessages: ['Error: unexpected outcome. Please try again.']
          });
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          const responseMessage = err && err.response && err.response.data && err.response.data.message;
          let hasInput1Problem, hasConfirmPasswordProblem, problemMessages;
          if (err && err.response && err.response.status === 401) {
            hasInput1Problem = false;
            hasConfirmPasswordProblem = true;
            problemMessages = [responseMessage];
          }
          else if (responseMessage && responseMessage.code === 1100) {
            hasInput1Problem = true;
            hasConfirmPasswordProblem = false;
            problemMessages = [`That ${this.props.property} is taken.`];
          }
          else {
            hasInput1Problem = false;
            hasConfirmPasswordProblem = false;
            problemMessages = ['Unknown error. Please try again.'];
          }
          this.setState({
            hasProblem: true,
            hasInput1Problem,
            hasInput2Problem: hasInput1Problem,
            hasConfirmPasswordProblem,
            isLoading: false,
            problemMessages
          });
        });
    }
  }

  cancelForm() {
    this.setState(defaultState);
    this.props.closeModal();
  }

  render() {
    const {
      property,
      isNew,
      currentValue,
      openPasswordResetModal,
      isActive,
      closeModal
    } = this.props;

    return (
      <ModalSkeleton
        modalTitle={`${isNew ? 'Add' : 'Edit'} ${property}`}
        modalTitleSuccess={property === 'email' ?
          'Check your email' :
          `${property.charAt(0).toUpperCase() + property.slice(1)} ${isNew ? 'Added!' : 'Changed!'}`
        }
        BodyContent={
          <form id={`edit-${property}-form`} onSubmit={this.submitForm}>
            <EditUserForm
              property={property}
              isNew={isNew}
              currentValue={currentValue}
              showInstructions={!this.state.hasSuccess && !this.state.hasProblem}
              hasSuccess={this.state.hasSuccess}
              hasProblem={this.state.hasProblem}
              problemMessages={this.state.problemMessages}
              successMessage={this.state.successMessage}
              input1={this.state.input1}
              input2={this.state.input2}
              confirmPasswordInput={this.state.confirmPasswordInput}
              handleChange={this.handleChange}
              hasInput1Problem={this.state.hasInput1Problem}
              hasInput2Problem={this.state.hasInput2Problem}
              hasConfirmPasswordProblem={this.state.hasConfirmPasswordProblem}
              isLoading={this.state.isLoading}
              isActive={isActive}
            />
            <div className="content">
              {!this.state.hasSuccess &&
                <p>
                  <span className="text-link" onClick={openPasswordResetModal}>Forgot your password?</span>
                </p>
              }
              <p>I will never share or sell your information.</p>
            </div>
          </form>
        }
        FooterContent={
          <button
            type="submit"
            form={`edit-${property}-form`}
            className="button is-success"
            disabled={this.state.isLoading}
            tabIndex={isActive ? 5 : -1}
          >
            Submit
          </button>
        }
        isModalActive={isActive}
        hasSuccess={this.state.hasSuccess}
        closeModal={closeModal}
        cancel={this.cancelForm}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default GenericEditAccountInfoModal;