import React from 'react';
import Box from '../box';
import BookInfoDisplay from '../book-info';

function savedBooksDisplay({ list, openSaveBookModal, openLoginModal, openCreateAccountModal, ...otherProps }) {
  let style = {
    box: {
      minHeight: 200,
      textAlign: 'center'
    },
    label: {
      textAlign: 'left'
    }
  }
  style.boxHasResults = Object.assign({ backgroundColor: '#fafafa' }, style.box);
  style.boxNoResults = Object.assign({ backgroundColor: '#f0f0f0' }, style.box);

  return(list ?
    <Box style={style.boxHasResults} id="saved-books">
      <label className="label" style={style.label}>Public List</label>
      {list.map(item => (
        <BookInfoDisplay book={item.book} key={item.book._id} openSaveBookModal={openSaveBookModal} openLoginModal={openLoginModal} openCreateAccountModal={openCreateAccountModal}/>
      ))}
    </Box> :
    <Box style={style.boxNoResults} id="saved-books">
      <label className="label" style={style.label}>Public List</label>
      <h4 className="title is-6">Fetching list...</h4>
    </Box>
  );
}

export default savedBooksDisplay;