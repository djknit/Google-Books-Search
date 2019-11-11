import React, { Component } from 'react';
import ModalSkeleton from '../modal-skeleton';
import BookInfoSummary from '../../book-info-summary';
import api from '../../../utilities/api';

class DeleteBookModal extends Component {
  constructor(props) {
    super(props);
    this.removeBookFromList = this.removeBookFromList.bind(this);
    this.state = {
      hasSuccess: false,
      hasError: false,
      isLoading: false,
      errorMessage: '',
    };
  }

  removeBookFromList() {
    this.setState({ isLoading: true });
    api.saved.userList.deleteBook(this.props.listItemId)
      .then(res => {
        console.log(res);
        if (res && res.data && res.data.books) {
          this.setState({
            errorMessage: null,
            hasError: false,
            hasSuccess: true,
            isLoading: false
          });
          this.props.updateUserList(res.data.books.reverse());
        }
        else this.setState({
          hasError: true,
          errorMessage: 'An unknown error has occurred.',
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err);
        let errorMessage = 'An error was encountered: ' +
          (err && err.response && err.response.data && err.response.data.message) || 'Unknown error.';
        this.setState({
          errorMessage,
          hasError: true,
          isLoading: false
        });
      });
  }

  render() {
    const { book } = this.props;

    return(
      <ModalSkeleton
        modalTitle="Remove Book from List"
        modalTitleSuccess="Book Removed!"
        BodyContent={
          <>
            <BookInfoSummary book={book} isSmall />
            <hr />
            <div className="content has-text-centered">
              {this.state.hasSuccess ?
                <p>
                  <em>{book.title}</em> was successfully removed from your list.
                </p>
                :
                this.state.hasError ?
                  <>
                    <p>Oops! An error has been encountered.</p>
                    <p>{this.state.errorMessage || <>Unknown error.</>}</p>
                  </>
                  :
                  <>
                    <p>You are about to remove this book from your list.</p>
                    <p>This action <strong>cannot be reversed.</strong></p>
                    <p className="is-size-5">
                      Are you sure you want to remove&nbsp;
                      <em>{book.title}</em> from your list?
                    </p>
                  </>
              }
            </div>
          </>
        }
        FooterContent={
          <button
            onClick={this.removeBookFromList}
            className="button is-danger"
            disabled={this.state.isLoading}
            tabIndex={1}
          >
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

export default DeleteBookModal;