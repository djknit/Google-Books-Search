import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import EditUserForm from './edit-user-form';

class GenericEditAccountInfoModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      hasSuccess: false,
      hasProblem: false,
      isLoading: false,
      problemMessage: null,
      input1: '',
      input2: this.props.property === 'password' ? '' : undefined,
      hasInput1Problem: false,
      hasInput2Problem: this.props.property === 'password' ? false : undefined
    }
  }

  handleChange() {

  }

  submitForm() {

  }

  render() {
    const { property, isNew } = this.props;

    return (
      <ModalSkeleton
        modalTitle={`${isNew ? 'Add' : 'Edit'} ${property}`}
        modalTitleSuccess={`${property} ${isNew ? 'Added!' : 'Changed!'}`}
        BodyContent={
          <form id={`edit-${property}-form`} onSubmit={this.submitForm}>
            <EditUserForm
              property={property}
              isNew={isNew}
              showInstructions={!this.state.hasSuccess && !this.state.hasProblem}
              hasSuccess={this.state.hasSuccess}
              hasProblem={this.state.hasProblem}
              problemMessage={this.state.problemMessage}
              input1={this.state.input1}
              input2={this.state.input2}
              handleChange={this.handleChange}
              hasInput1Problem={this.state.hasInput1Problem}
              hasInput2Problem={this.state.hasInput2Problem}
              isLoading={this.state.isLoading}
            />
          </form>
        }
        FooterContent={
          <button
            type="submit"
            form={`edit-${property}-form`}
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
      />
    );
  }
}

export default GenericEditAccountInfoModal;