import React, { Component } from 'react';
import './style.css';
import api from '../../../utilities/api';
import ModalSkeleton from '../modal-skeleton';
import NewUserForm from './new-user-form';

class loginModal extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
      hasVerifyPasswordProblem: false,
      isLoading: false
    };
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitForm(event) {
    event.preventDefault();
    this.setState({ showInstructions: false });
    let { username, email, password, verifyPassword } = this.state;
    if (username) username = username.trim();
    if (email) email = email.trim();
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
      problemMessage: 'The email address you entered does not appear to be a valid address.',
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
      hasVerifyPasswordProblem: false,
      isLoading: true
    });
    const newUser = {
      username: username || undefined,
      email: email || undefined,
      password
    };
    console.log(newUser)
    api.auth.createAccount(newUser)
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
            hasUsernameProblem: resData.problems.username,
            hasEmailProblem: resData.problems.email,
            hasPasswordProblem: resData.problems.password,
            hasVerifyPasswordProblem: resData.problems.verifyPassword,
            isLoading: false
          });  
        }
      })
      .catch(err => this.setState({
          problemMessage: 'Unknown error.',
          hasProblems: true,
          hasUsernameProblem: false,
          hasEmailProblem: false,
          hasPasswordProblem: false,
          hasVerifyPasswordProblem: false,
          isLoading: false
        })
      );
  }

  cancelForm(event) {
    event.preventDefault();
    this.setState({
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasEmailProblem: false,
      hasUsernameProblem: false,
      hasPasswordProblem: false,
      hasVerifyPasswordProblem: false,
      isLoading: false
    });
    this.props.closeModal();
  }

  render() {
    const {
      isActive,
      closeModal
    } = this.props;

    return (
      <ModalSkeleton
        modalTitle="Create Account"
        modalTitleSuccess="Account Created!"
        BodyContent={
          <form id="new-user-form">
            <NewUserForm
              showInstructions={this.state.showInstructions}
              hasSuccess={this.state.hasSuccess}
              hasProblems={this.state.hasProblems}
              problemMessage={this.state.problemMessage}
              username={this.state.username}
              email={this.state.email}
              handleChange={this.handleChange}
              hasUsernameProblem={this.state.hasUsernameProblem}
              hasEmailProblem={this.state.hasEmailProblem}
              password={this.state.password}
              verifyPassword={this.state.verifyPassword}
              hasPasswordProblem={this.state.hasPasswordProblem}
              hasVerifyPasswordProblem={this.state.hasVerifyPasswordProblem}
              isLoading={this.state.isLoading}
            />
          </form>
        }
        FooterContent={
          <button
            onClick={this.submitForm}
            type="submit" form="new-user-form"
            className="button is-success"
            disabled={this.state.isLoading}
          >
            Submit
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