import React from 'react';
import './style.css';
import CreateAccountModal from './create-account';
import LoginModal from './login';
import SaveBookModal from './save-book';
import PrivacySettingsModal from './privacy-settings';

export default ({
  isCreateAccountModalActive,
  closeCreateAccountModal,
  setUser,
  isLoginModalActive,
  closeLoginModal,
  isSaveBookModalActive,
  closeSaveBookModal,
  openLoginModal,
  openCreateAccountModal,
  bookToSave,
  user,
  closePrivacySettingsModal,
  isPrivacySettingsModalActive,
  openPrivacySettingsModal
}) => {
  
  return (
    <>
      <CreateAccountModal
        closeModal={closeCreateAccountModal}
        isActive={isCreateAccountModalActive}
        setUser={setUser}
      />
      <LoginModal
        closeModal={closeLoginModal}
        isActive={isLoginModalActive}
        setUser={setUser}
      />
      {isSaveBookModalActive &&
        <SaveBookModal
          closeModal={closeSaveBookModal}
          isActive={isSaveBookModalActive}
          openLoginModal={openLoginModal}
          openCreateAccountModal={openCreateAccountModal}
          book={bookToSave}
          user={user}
          openPrivacySettingsModal={openPrivacySettingsModal}
        />
      }
      {user &&
        <PrivacySettingsModal
          user={user}
          closeModal={closePrivacySettingsModal}
          isActive={isPrivacySettingsModalActive}
          closeSaveBookModal={closeSaveBookModal}
          setUser={setUser}
        />
      }
    </>
  );
}