import React from 'react';
import './style.css';
import CreateAccountModal from './create-account';
import LoginModal from './login';
import SaveBookModal from './save-book';

export default ({
  isCreateAccountModalActive,
  closeCreateAccountModal,
  logUserIn,
  isLoginModalActive,
  closeLoginModal,
  isSaveBookModalActive,
  closeSaveBookModal,
  openLoginModal,
  openCreateAccountModal,
  bookToSave,
  user
}) => {
  
  return (
    <>
      <CreateAccountModal
        closeModal={closeCreateAccountModal}
        isActive={isCreateAccountModalActive}
        logUserIn={logUserIn}
      />
      <LoginModal
        closeModal={closeLoginModal}
        isActive={isLoginModalActive}
        logUserIn={logUserIn}
      />
      {isSaveBookModalActive &&
        <SaveBookModal
          closeModal={closeSaveBookModal}
          isActive={isSaveBookModalActive}
          openLoginModal={openLoginModal}
          openCreateAccountModal={openCreateAccountModal}
          book={bookToSave}
          user={user}
        />
      }
    </>
  );
}