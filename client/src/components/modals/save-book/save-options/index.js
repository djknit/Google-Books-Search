import React from 'react';
import Box from '../../../box';

function SaveOptionsDisplay(props) {
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
    },
    link: {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
  
  return (<>
    {props.savedStatus.publicList ? 
      <Box style={style.inactiveBox}>
        This book is already saved to the public list.
      </Box> :
      <Box style={style.box}>
        <p style={style.boxText}>This book is not saved to the public list yet.</p>
        <button className="button is-primary" onClick={props.saveToPublicList}>Save to public list</button>
      </Box>
    }
    {props.user ?
      props.savedStatus.userList ? 
        <Box style={style.inactiveBox}>
          This book is already saved to your personal list.
        </Box> :
        <Box style={style.box}>
          <p style={style.boxText}>This book is not saved to your personal list.</p>
          <button className="button is-primary" onClick={props.saveToUserList}>Save to personal list</button>
        </Box>
      :
      <Box style={style.inactiveBox}>
        If you <span style={style.link} onClick={props.openLoginModal}>sign in</span>
         or <span style={style.link} onClick={props.openCreateAccountModal}>create an account</span>,
        you can save books to a personal list.
      </Box>
    }
  </>)
}

export default SaveOptionsDisplay;