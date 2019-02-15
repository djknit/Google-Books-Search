import React from 'react';
import './style.css';
import NavLink from './nav-link';

function navbar(props) {
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
                <NavLink path="/saved" text="Public List" />
                <NavLink path="/mylist" text="Your List" />
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
            <div className="buttons">
              <button onClick={props.openCreateAccountModal} className="button is-primary">
                <strong>Sign up</strong>
              </button>
              <button onClick={props.openLoginModal} className="button is-light">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;