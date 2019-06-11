import React from 'react';
import './style.css';
import Box from '../../../box';

export default ({
  user,
  savedStatus,
  saveToPublicList,
  saveToUserList,
  openCreateAccountModal,
  openLoginModal
}) => {

  const style = {
    box: {
      textAlign: 'right'
    },
    inactiveBox: {
      backgroundColor: '#f0f0f0',
      padding: 20
    },
    boxText: {
      marginBottom: 10,
      textAlign: 'left'
    }
  }
  
  return (<>
    {savedStatus.publicList ? 
      <Box style={style.inactiveBox}>
        This book is already saved to the public list.
      </Box> :
      <Box style={style.box}>
        <p className="save-options box-text">This book is not saved to the public list yet.</p>
        <button
          className="button is-primary"
          onClick={saveToPublicList}
          tabIndex={1}
        >
          Save to public list
        </button>
      </Box>
    }
    {user ?
      savedStatus.userList ? 
        <Box style={style.inactiveBox}>
          This book is already saved to your personal list.
        </Box> :
        <Box style={style.box}>
          <p className="save-options box-text">This book is not saved to your personal list.</p>
          <button
            className="button is-primary"
            onClick={saveToUserList}
            tabIndex={2}
          >
            Save to personal list
          </button>
        </Box>
      :
      <Box style={style.inactiveBox}>
        If you <span className="text-link" onClick={openLoginModal} tabIndex={2} >
          sign in</span> or <span className="text-link" onClick={openCreateAccountModal} tabIndex={3}>
          create an account</span>,
        you can save books to a personal list.
      </Box>
    }
  </>)
};