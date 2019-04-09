import React, { Component } from 'react';
import './style.css';
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
    this.selectSaveToPublicList = this.selectSaveToPublicList.bind(this);
    this.state = {
      hasSuccess: false,
      hasError: false,
      savedStatus: null,
      saveTo: null,
      isLoading: false,
      failMessage: '',
      arePrivacySettingsSet: !this.props.user ||
        (this.props.user.shareUsername !== undefined && this.props.user.shareEmail !== undefined)
    };
  }

  saveBook() {
    if (!this.state.saveTo) return console.error('list not chosen');
    this.setState({ isLoading: true });
    const apiCall = this.state.saveTo.userList ?
      api.saved.userList.post :
      this.props.user ?
        api.saved.publicList.postAsUser :
        api.saved.publicList.postAsGuest;
    apiCall(this.props.book)
      .then(res => {
        if (res.data && res.data.success) return this.setState({
          hasSuccess: true,
          isLoading: false,
          isConfirmed: true
        });
        this.setState({
          hasError: true, 
          failMessage: (res.data && res.data.message) ||
            'An unknown error was encountered while attempting to save the book.',
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          hasError: true,
          isLoading: false,
          failMessage:
            (err && err.response && err.response.data && err.response.data.message) ||
            'Unknown error. The book was not saved.'
        });
      });
  }

  selectSaveToPublicList() {
    this.setState({
      saveTo: { publicList: true }
    });
    if (!this.state.arePrivacySettingsSet) this.props.openPrivacySettingsModal();
  }

  componentDidMount() {
    console.log(this.props.user)
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
        modalTitle="Save Book"
        modalTitleSuccess="Book Saved!"
        BodyContent={!this.state.saveTo ?
          <>
            <BookInfoSummary book={this.props.book} isSmall />
            <hr className='save-book' />
            {!this.state.savedStatus ?
              <Box style={{ backgroundColor: '#f0f0f0' }}>
                Checking save status...
              </Box>
              :
              <SaveOptionsDisplay
                savedStatus={this.state.savedStatus}
                user={this.props.user}
                openLoginModal={this.props.openLoginModal}
                openCreateAccountModal={this.props.openCreateAccountModal}
                saveToPublicList={this.selectSaveToPublicList}
                saveToUserList={() => this.setState({ saveTo: { userList: true } })}
              />
            }
          </>
          :
          this.state.hasError ?
            <div className="notification is-danger has-shadow">
              <strong>Error</strong>
              <br />
              {this.state.failMessage || 'Unable to save book. Unknown error.'}
            </div>
            :
            <ConfirmSave
              book={this.props.book}
              user={this.props.user}
              isPublic={this.state.saveTo && this.state.saveTo.publicList}
              isUser={this.state.saveTo && this.state.saveTo.userList}
              hasSuccess={this.state.hasSuccess}
            />
        }
        FooterContent={this.state.saveTo &&
          <button onClick={this.saveBook} className="button is-success" disabled={this.state.isLoading}>
            Confirm
          </button>
        }
        isModalActive={this.props.isActive}
        hasSuccess={this.state.hasSuccess}
        closeModal={this.props.closeModal}
        cancel={this.props.closeModal}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError}
      />
    );
  }
}

export default SaveBookModal;