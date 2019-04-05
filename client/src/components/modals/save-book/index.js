import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Box from '../../box';
import BookInfoSummary from './book-info-summary';
import ConfirmSave from './confirm-save';
import SaveOptionsDisplay from './save-options';
// import './style.css';
import api from '../../../utilities/api';

class SaveBookModal extends Component {
  constructor(props) {
    super(props);
    this.saveBook = this.saveBook.bind(this);
    this.state = {
      hasSuccess: false,
      savedStatus: null,
      saveTo: null,
      isConfirmed: false
    };
  }

  saveBook() {
    if (!this.state.saveTo) return console.error('list not chosen');
    const apiCall = this.state.saveTo.userList ?
      api.saved.userList.post :
      this.props.user ? api.saved.publicList.postAsUser : api.saved.publicList.postAsGuest;
    apiCall(this.props.book).then(res => console.log(res))
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
    return this.props.book ? (
      <div id="saveBookModal" className={this.props.isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{ minWidth: 252 }}>
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>Save</p>
            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body has-text-centered">
            {!this.state.saveTo ?
              <>
                <BookInfoSummary book={this.props.book} isSmall></BookInfoSummary>
                <hr style={{ height: 1, backgroundColor: '#a7a7a7', width: 'calc(100% - 50px)', display: 'inline-block', margin: 0 }}></hr>
                {!this.state.savedStatus ?
                  <Box style={{ backgroundColor: '#f0f0f0' }}>
                    Checking save status...
                  </Box> :
                  <SaveOptionsDisplay
                    savedStatus={this.state.savedStatus}
                    user={this.props.user}
                    openLoginModal={this.props.openLoginModal}
                    openCreateAccountModal={this.props.openCreateAccountModal}
                    saveToPublicList={() => this.setState({ saveTo: { publicList: true } })}
                    saveToUserList={() => this.setState({ saveTo: { userList: true } })}
                  ></SaveOptionsDisplay>
                }
              </> :
              !this.state.isConfirmed ?
                <ConfirmSave
                  book={this.props.book}
                  user={this.props.user}
                  isPublic={this.state.saveTo && this.state.saveTo.publicList}
                  isUser={this.state.saveTo && this.state.saveTo.userList}
                ></ConfirmSave> :
                <Box></Box>
            }
          </section>
          <footer className="modal-card-foot buttons is-right">
            {this.state.saveTo &&
              <button onClick={this.saveBook} className="button is-success">Confirm</button>
            }
            <button onClick={this.props.closeModal} className="button">Cancel</button>
          </footer>
        </div>
      </div>
    ) :
    <></>
  } 
};

export default SaveBookModal;