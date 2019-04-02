import React from 'react';
import './style.css';
import NavLink from './nav-link';

function navbar({ user, openCreateAccountModal, openLoginModal, logOut }) {
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="shadow-cover"></div>
        <div className="shadow"></div>
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
                  {user !== null &&
                    <NavLink path="/my-list" text="Your List" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>  
        <div id="auth-links" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              {user ?
                <div className="buttons">
                  <span id="welcome-message">
                    Hi {user.username || user.email}
                  </span>
                  <button onClick={logOut} className="button is-light">
                    Log out
                  </button>
                </div>
                :
                <div className="buttons">
                  <button onClick={openCreateAccountModal} className="button is-primary">
                    <strong>Sign up</strong>
                  </button>
                  <button onClick={openLoginModal} className="button is-light">
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

export default navbar;