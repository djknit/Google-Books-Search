import React from 'react';
import './style.css';
import CreateAccountModal from './create-account';
import LoginModal from './login';
import SaveBookModal from './save-book';
import DeleteBookModal from './delete-book';
import PrivacySettingsModal from './privacy-settings';
import PasswordResetModal from './password-reset';
import EditAccountInfoModals from './edit-account-info';

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
  openPrivacySettingsModal,
  isDeleteBookModalActive,
  closeDeleteBookModal,
  bookToDelete,
  updateUserList,
  isPasswordResetModalActive,
  openPasswordResetModal,
  closePasswordResetModal,
  isEditEmailModalActive,
  closeEditEmailModal,
  isEditUsernameModalActive,
  closeEditUsernameModal,
  isEditPasswordModalActive,
  closeEditPasswordModal
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
        openPasswordResetModal={openPasswordResetModal}
      />
      <PasswordResetModal
        closeModal={closePasswordResetModal}
        isActive={isPasswordResetModalActive}
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
      {isDeleteBookModalActive &&
        <DeleteBookModal
          closeModal={closeDeleteBookModal}
          isActive={isDeleteBookModalActive}
          listItemId={bookToDelete._id}
          book={bookToDelete.book}
          user={user}
          updateUserList={updateUserList}
        />
      }
      {user &&
        <>
          <PrivacySettingsModal
            user={user}
            closeModal={closePrivacySettingsModal}
            isActive={isPrivacySettingsModalActive}
            closeSaveBookModal={closeSaveBookModal}
            setUser={setUser}
          />
          <EditAccountInfoModals
            user={user}
            setUser={setUser}
            isEditEmailModalActive={isEditEmailModalActive}
            closeEditEmailModal={closeEditEmailModal}
            isEditUsernameModalActive={isEditUsernameModalActive}
            closeEditUsernameModal={closeEditUsernameModal}
            isEditPasswordModalActive={isEditPasswordModalActive}
            closeEditPasswordModal={closeEditPasswordModal}
          />
        </>
      }
    </>
  );
}