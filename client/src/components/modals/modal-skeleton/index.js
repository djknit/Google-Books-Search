import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default ({
  modalTitle,
  modalTitleSuccess,
  BodyContent,
  FooterContent,
  isModalActive,
  hasSuccess,
  closeModal,
  cancel,
  isBodyCentered,
  successRedirectPath,
  isLoading,
  hasError,
  isPrivacySettingsModal,
  isPasswordResetModal
}) => {

  const headerColor = (hasSuccess && '#23d160') || (hasError && '#ff3860');
  const modalStyle = { zIndex: isPasswordResetModal ? 42 : 40 };

  return (
    <div className={isModalActive ? 'modal is-active' : 'modal'} style={modalStyle}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{ minWidth: 252 }}>
        <header className="modal-card-head" style={headerColor ? { backgroundColor: headerColor } : {}}>
          <p className="modal-card-title" style={headerColor ? { color: 'white' } : {}}>
            {(hasSuccess && modalTitleSuccess) || (hasError && 'Error') || modalTitle}
          </p>
          <button
            onClick={hasSuccess || isPrivacySettingsModal ? cancel : closeModal}
            className="delete has-shadow"
            aria-label="close"
          />
        </header>
        <section className={`modal-card-body${isBodyCentered ? ' has-text-centered' : ''}`}>
          {BodyContent}
        </section>
        <footer className="modal-card-foot buttons is-right">
          {(hasSuccess || hasError) ?
            (hasSuccess && successRedirectPath) ?
              <Link
                onClick={cancel}
                to={successRedirectPath}
                className="button is-success has-shadow"
              >
                OK
              </Link>
              :
              <button
                onClick={cancel}
                className={`button has-shadow${hasSuccess ? ' is-success' : ''}`}
              >
                OK
              </button>
            :
            <>
              {FooterContent}
              <button onClick={cancel} className="button" disabled={isLoading}>
                Cancel
              </button>
            </>
          }
        </footer>
      </div>
    </div>
  );
}