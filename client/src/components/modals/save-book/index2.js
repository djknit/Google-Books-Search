import React, { Component } from 'react';
import ModalSkeleton from '../modal-skeleton';
import Box from '../../box';
import BookInfoSummary from './book-info-summary';
import ConfirmSave from './confirm-save';
import SaveOptionsDisplay from './save-options';
import api from '../../../utilities/api';

class SaveBookModal extends Component {
  constructor(props) {
    super(props);
    this.saveBook = this.saveBook.bind(this);
    this.state = {
      hasSuccess: false,
      hasError: false,
      savedStatus: null,
      saveTo: null,
      isConfirmed: false,
      isLoading: false,
      failMessage: ''
    };
  }

  saveBook() {
    if (!this.state.saveTo) return console.error('list not chosen');
    this.setState({ isLoading: true });
    const apiCall = this.state.saveTo.userList ?
      api.saved.userList.post :
      this.props.user ? api.saved.publicList.postAsUser : api.saved.publicList.postAsGuest;
    apiCall(this.props.book).then(res => {
      if (res.data && res.data.success) return this.setState({
        hasSuccess: true
      });
      this.setState({
        hasSuccess: false,
        failMessage: (res.data && res.data.message) || ''
      });
    });
  }

  componentDidMount() {
    const apiCall = this.props.user ? api.saved.checkSavedStatusAsUser : api.saved.checkSavedStatusAsGuest;
    apiCall({ gId: this.props.book.gId })
      .then(res => {
        console.log(res)
        this.setState({ savedStatus: res.data });
      })
  }
  
  render() {
    return(
      <ModalSkeleton
        modalTitle="Sign In"
        BodyContent={

        }
        FooterContent={
          <button type="submit" form="login-form" className="button is-success">Sign In</button>
        }
        isModalActive={this.props.isActive}
        hasSuccess={this.state.hasSuccess}
        closeModal={this.props.closeModal}
        cancel={this.cancelForm}
        successRedirectPath="/search"
      />
    );
  }
}

export default SaveBookModal;