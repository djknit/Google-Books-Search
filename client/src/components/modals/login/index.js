import React, { Component } from 'react';
import api from '../../../utilities/api';
import ModalSkeleton from '../modal-skeleton';
import LoginForm from './login-form';

const defaultState = {
  usernameOrEmail: '',
  password: '',
  problemMessage: '',
  hasSuccess: false,
  hasProblems: false,
  hasUsernameOrEmailProblem: false,
  hasPasswordProblem: false,
  isLoading: false
};

class loginModal extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.state = defaultState;
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitForm(event) {
    event.preventDefault();
    // Next line is fix for bug where form was showing problem message after user logs in, logs out,
      // and then opens login modal again. It looks to have come from this function being run before modal is opened.
    if (!this.props.isActive) return null;
    let { usernameOrEmail, password } = this.state;
    if (usernameOrEmail) usernameOrEmail = usernameOrEmail.trim();
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
      isLoading: true
    });
    api.auth.login(usernameOrEmail, password)
      .then(res => {
        const resData = res.data;
        console.log(resData);
        if (resData.success) {
          this.setState({
            hasProblems: false,
            hasSuccess: true,
            isLoading: false
          });
          this.props.setUser(resData.user);
        }
        else {
          this.setState({
            problemMessage: resData.message,
            hasProblems: true,
            isLoading: false
          });
        }
      })
      .catch(err => {
        const resData = err.response ? err.response.data : {};
        console.log(resData);
        this.setState({
          problemMessage: resData.message || 'Unknown error. Please try again.',
          hasProblems: true,
          hasUsernameOrEmailProblem: resData.problems && resData.problems.usernameOrEmail,
          hasPasswordProblem: resData.problems && resData.problems.password,
          isLoading: false
        });
      });
  }

  cancelForm() {
    this.setState(defaultState);
    this.props.closeModal();
  }

  render() {
    const {
      openPasswordResetModal,
      isActive,
      closeModal
    } = this.props;

    return(
      <ModalSkeleton
        modalTitle="Sign In"
        modalTitleSuccess="Signed In!"
        BodyContent={
          <form id="login-form" onSubmit={this.submitForm}>
            <LoginForm
              usernameOrEmail={this.state.usernameOrEmail}
              password={this.state.password}
              problemMessage={this.state.problemMessage}
              hasSuccess={this.state.hasSuccess}
              hasProblems={this.state.hasProblems}
              hasUsernameOrEmailProblem={this.state.hasUsernameOrEmailProblem}
              hasPasswordProblem={this.state.hasPasswordProblem}
              handleChange={this.handleChange}
              submitForm={this.submitForm}
              isLoading={this.state.isLoading}
              openPasswordResetModal={openPasswordResetModal}
            />
          </form>
        }
        FooterContent={
          <button
            type="submit"
            form="login-form"
            className="button is-success"
            disabled={this.state.isLoading}
          >
            Sign In
          </button>
        }
        isModalActive={isActive}
        hasSuccess={this.state.hasSuccess}
        closeModal={closeModal}
        cancel={this.cancelForm}
        successRedirectPath={window.location.pathname === '/' ? '/search' : false}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default loginModal; 