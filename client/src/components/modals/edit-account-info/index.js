import React from 'react';
import GenericEditAccountInfoModal from '../edit-account-info/generic';

export default ({
  user,
  setUser,
  openPasswordResetModal,
  isEditUsernameModalActive,
  isEditEmailModalActive,
  isEditPasswordModalActive,
  closeEditUsernameModal,
  closeEditEmailModal,
  closeEditPasswordModal
}) => {

  return (
    <>
      <GenericEditAccountInfoModal
        property="username"
        isNew={!user.username}
        openPasswordResetModal={openPasswordResetModal}
        isActive={isEditUsernameModalActive}
        closeModal={closeEditUsernameModal}
        setUser={setUser}
        currentValue={user.username}
        key={"username" + isEditUsernameModalActive}
      />
      <GenericEditAccountInfoModal
        property="email"
        isNew={!user.email}
        openPasswordResetModal={openPasswordResetModal}
        isActive={isEditEmailModalActive}
        closeModal={closeEditEmailModal}
        setUser={setUser}
        currentValue={user.email}
        key={"email" + isEditEmailModalActive}
      />
      <GenericEditAccountInfoModal
        property="password"
        isNew={false}
        openPasswordResetModal={openPasswordResetModal}
        isActive={isEditPasswordModalActive}
        closeModal={closeEditPasswordModal}
        setUser={setUser}
        currentValue={user.password}
        key={"password" + isEditPasswordModalActive}
      />
    </>
  );
}