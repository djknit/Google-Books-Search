import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '../../box';
// import './style.css';
import api from '../../../utilities/api';

class SaveBookModal extends Component {
  constructor(props) {
    super(props);
    this.saveBook = this.saveBook.bind(this);
    this.state = {
      hasSuccess: false
    };
  }

  saveBook() {
    api.publicList.saveBookAsGuest(this.props.book)
      .then(res => console.log(res))
  }

  render() {
    return this.props.book ? (
      <div id="saveBookModal" className={this.props.isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>
              Save to {this.props.isPublic ? 'Public' : 'Your Private'} List
            </p>
            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="content has-text-centered">
              <p className="is-size-5 has-text-left">You are about to save...</p>
              <Box>
                {this.props.book.subtitle ?
                  <p><span className="title is-4">"{this.props.book.title}</span> <span className="subtitle is-4">&mdash; {this.props.book.subtitle}"</span></p> :
                  <p><span className="title is-4">"{this.props.book.title}"</span></p>
                }
                {this.props.book.authors ?
                  <p className="is-size-4">
                    By
                    <span>{this.props.book.authors.length > 2 ?
                      this.props.book.authors.map((author, i, arr) => (
                        i < arr.length - 1 ?
                          ` ${author}, ` :
                          `and ${author}`
                      )) :
                      this.props.book.authors.map((author, i) => (
                        i < 1 ?
                          ` ${author}` :
                          ` and ${author}`
                      ))
                    }</span>
                  </p> :
                  <p>Author unknown</p>
                }
              </Box>
              <p className="is-size-5 has-text-right">
                ...to the public list.
              </p>
            </div>
          </section>
          {this.state.hasSuccess ?
            <footer className="modal-card-foot buttons is-right">
              <Link onClick={this.cancelForm} to="/search" className="button is-success">OK</Link>
            </footer>
            :
            <footer className="modal-card-foot buttons is-right">
              <button onClick={this.saveBook} className="button is-success">Confirm</button>
              <button onClick={this.props.closeModal} className="button">Cancel</button>
            </footer>
          }
        </div>
      </div>
    ) :
    <></>
  } 
};

export default SaveBookModal;