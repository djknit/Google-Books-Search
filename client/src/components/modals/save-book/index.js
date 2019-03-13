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
      isReady: false,
      hasSuccess: false
    };
  }

  saveBook() {
    api.saved.saveBookAsGuest(this.props.book)
      .then(res => console.log(res))
  }

  componentDidMount() {
    api.saved.
  }

  render() {
    return this.props.book ? (
      <div id="saveBookModal" className={this.props.isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head" style={this.state.hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
            <p className={this.state.hasSuccess ? 'modal-card-title is-success' : 'modal-card-title'}>Save</p>
            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            {!this.state.isReady ?
              <Box style={{ backgroundColor: '#f0f0f0' }}>
                Checking save status...
              </Box> :

            }
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

export default SaveBookModal;d