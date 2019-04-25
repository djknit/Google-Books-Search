import React from 'react';
import GenericEditAccountInfoModal from '../edit-account-info/generic';

export default ({
  user,
  
}) => {

  return (
    <>
      <GenericEditAccountInfoModal
        property="username"
        isNew={user.username}
      />
      <GenericEditAccountInfoModal
        property="email"
        isNew={user.username}
      />
      <GenericEditAccountInfoModal
        property="password"
        isNew={user.username}
      />
    </>
  )
}