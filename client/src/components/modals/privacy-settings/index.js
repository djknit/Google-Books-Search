import React, { Component } from 'react';
import './style.css';
import api from '../../../utilities/api';
import ModalSkeleton from '../modal-skeleton';

class PrivacySettingsModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.currentSettingsSelectionValue = this.currentSettingsSelectionValue.bind(this);
    this.state = {
      selection: this.currentSettingsSelectionValue(),
      problemMessage: '',
      hasSuccess: false,
      hasProblems: false,
      hasInputProblem: false,
      isLoading: false
    };
  }

  currentSettingsSelectionValue() {
    return (
      (this.props.user.shareUsername && 'username') ||
      (this.props.user.shareEmail && 'email') ||
      (this.props.user.shareEmail === false && this.props.user.shareUsername === false && 'none') ||
      null
    );
  }
  
  handleChange(event) {
    this.setState({ selection: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    if (!this.state.selection) return this.setState({
      problemMessage: 'Error. No selection recorded.',
      hasProblems: true,
      hasInputProblem: false,
    });
    this.setState({
      hasProblems: false,
      hasInputProblem: false,
      isLoading: true
    });
    const shareUsername = this.state.selection === 'username';
    const shareEmail = this.state.selection === 'email'
    api.auth.updatePrivacySettings({
      shareUsername,
      shareEmail
    })
      .then(res => {
        const resData = res.data;
        console.log(resData);
        if (resData.success) {
          this.setState({
            hasProblems: false,
            hasSuccess: true,
            isLoading: false
          });
          let user = Object.assign({}, this.props.user);
          user.shareEmail = shareEmail;
          user.shareUsername = shareUsername;
          this.props.setUser(user);
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
        console.log(err)
        const resData = err.response ? err.response.data : {};
        console.log(resData);
        this.setState({
          problemMessage: resData.message || 'Unknown error. Please try again.',
          hasProblems: true,
          hasInputProblem: false,
          isLoading: false
        });
      });
  }

  cancelForm(event) {
    event.preventDefault();
    if (!this.state.hasSuccess) this.props.closeSaveBookModal();
    this.setState({
      problemMessage: null,
      hasSuccess: false,
      hasProblems: false,
      hasInputProblem: false,
      isLoading: false,
      selection: this.currentSettingsSelectionValue()
    });
    console.log(this.state);
    this.props.closeModal();
  }

  render() {
    const { user, isActive, closeModal } = this.props;

    return(
      <ModalSkeleton
        modalTitle="Update Privacy Settings"
        modalTitleSuccess="Privacy Settings Updated"
        BodyContent={
          <form id="privacy-settings" onSubmit={this.submitForm}>
            <p className="help">
              When you save a book to the public list, do you want other users to be able to see your username or email address?
            </p>
            <div className="control">
              {user && user.username &&
                <>
                  <label className="radio">
                    <input
                      type="radio"
                      value="username"
                      checked={this.state.selection === 'username'}
                      onChange={this.handleChange}
                      disabled={this.state.hasSuccess}
                    /> 
                    Let users see my username.
                  </label>
                  <br />
                </>
              }
              {user && user.email &&
                <>
                  <label className="radio">
                    <input
                      type="radio"
                      value="email"
                      checked={this.state.selection === 'email'}
                      onChange={this.handleChange}
                      disabled={this.state.hasSuccess}
                    />
                    Let users see my email address.
                  </label>
                  <br />
                </>
              }
              <label className="radio">
                <input
                  type="radio"
                  value="none"
                  checked={this.state.selection === 'none'}
                  onChange={this.handleChange}
                  disabled={this.state.hasSuccess}
                />
                Do <strong>not</strong> share my username or email address with other users.
              </label>
            </div>
          </form>
        }
        FooterContent={
          <button
            type="submit"
            form="privacy-settings"
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
        isLoading={this.state.isLoading}
        isPrivacySettingsModal
      />
    );
  }
}

export default PrivacySettingsModal; 