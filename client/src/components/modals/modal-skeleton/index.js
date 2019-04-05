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
  isLoading
}) => {

  return (
    <div className={isModalActive ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{ minWidth: 252 }}>
        <header className="modal-card-head" style={hasSuccess ? { backgroundColor: '#20bc56' } : {}}>
          <p className={`modal-card-title${hasSuccess ? ' is-success' : ''}`}>
            {hasSuccess && modalTitleSuccess ? modalTitleSuccess : modalTitle}
          </p>
          <button
            onClick={hasSuccess ? cancel : closeModal} className="delete has-shadow" aria-label="close" />
        </header>
        <section className={`modal-card-body${isBodyCentered ? ' has-text-centered' : ''}`}>
          {BodyContent}
        </section>
        <footer className="modal-card-foot buttons is-right">
          {hasSuccess ?
            successRedirectPath ?
              <Link
                onClick={cancel}
                to={successRedirectPath}
                className="button is-success has-shadow"
              >
                OK
              </Link> :
              <button
                onClick={cancel}
                className="button is success has-shadow"
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