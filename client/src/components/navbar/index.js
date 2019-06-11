import React from 'react';
import './style.css';
import NavLink from './nav-link';

export default ({
  user,
  logOut,
  openCreateAccountModal,
  openLoginModal,
  openPrivacySettingsModal,
  openEditUsernameModal,
  openEditEmailModal,
  openEditPasswordModal,
  areAnyModalsOpen
}) => {

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink path="/search" text="Search" tabIndex={areAnyModalsOpen ? -1 : 4} />
        <div className="navbar-item" tabIndex={areAnyModalsOpen ? -1 : 5}>
          <div className="dropdown is-hoverable" onClick={() => console.log('teestststt')} >
            <div className="dropdown-trigger">
              <button className="button has-no-shadow" aria-haspopup="true" aria-controls="saved-titles-nav-dropdown">
                <span>Saved Titles</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu has-shadow" id="saved-titles-nav-dropdown" role="menu">
              <div className="dropdown-content">
                <NavLink path="/public-list" text="Public List" />
                {user !== null &&
                  <NavLink path="/my-list" text="Your List" />
                }
              </div>
            </div>
          </div>
        </div>
        {user &&
          <div className="navbar-item" tabIndex={areAnyModalsOpen ? -1 : 8}>
            <div className="dropdown is-hoverable">
              <div className="dropdown-trigger">
                <button className="button has-no-shadow" aria-haspopup="true" aria-controls="account-nav-dropdown">
                  <span>Account</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu has-shadow" id="account-nav-dropdown" role="menu">
                <div className="dropdown-content">
                  <NavLink text="Privacy settings" onClick={openPrivacySettingsModal} />
                  <NavLink
                    text={`${user.username ? 'Change your' : 'Create a'} username`}
                    onClick={openEditUsernameModal}
                  />
                  <NavLink
                    text={`${user.email ? 'Change your' : 'Add your'} email`}
                    onClick={openEditEmailModal}
                  />
                  <NavLink text="Change your password" onClick={openEditPasswordModal} />
                </div>
              </div>
            </div>
          </div>
        }
      </div>  
      <div id="auth-links" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {user ?
              <div className="buttons">
                <span id="welcome-message">
                  Hi {user.username || user.email}
                </span>
                <button onClick={logOut} className="button" tabIndex={areAnyModalsOpen ? -1 : 9}>
                  Log out
                </button>
              </div>
              :
              <div className="buttons">
                <button onClick={openCreateAccountModal} className="button is-primary" tabIndex={areAnyModalsOpen ? -1 : 10}>
                  <strong>Sign up</strong>
                </button>
                <button onClick={openLoginModal} className="button is-light" tabIndex={areAnyModalsOpen ? -1 : 11}>
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