import React, { Component } from 'react';
import './style.css';
import NavLink from './nav-link';

class navbar extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
  
          <NavLink path="/search" text="Search" />
  
          <div className="navbar-item">
            <div className="dropdown is-hoverable">
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>Saved Titles</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content">
                  <NavLink path="/public-list" text="Public List" />
                  {this.props.isLoggedIn &&
                    <NavLink path="/my-list" text="Your List" />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <div className="dropdown is-hoverable" >
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span>Hover me</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item navbar-item">
                    <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
        <div id="auth-links" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.isLoggedIn ?
                <div className="buttons">
                  <span id="welcome-message">{this.props.user ?
                    `Hi ${this.props.user.username || this.props.user.email} ` :
                    'Welcome'
                  }</span>
                  <button onClick={this.props.logOut} className="button is-light">
                    Log out
                  </button>
                </div>
                :
                <div className="buttons">
                  <button onClick={this.props.openCreateAccountModal} className="button is-primary">
                    <strong>Sign up</strong>
                  </button>
                  <button onClick={this.props.openLoginModal} className="button is-light">
                    Log in
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    );  
  }
}

export default navbar;