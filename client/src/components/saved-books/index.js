import React from 'react';
import './style.css';
import Box from '../box';
import BookInfoDisplay from '../book-info';

export default ({
  list,
  openSaveBookModal,
  openLoginModal,
  openCreateAccountModal, 
  ...otherProps
}) => {

  const style = {
    box: {
      minHeight: 200,
      backgroundColor: list ? '#fafafa' : '#f0f0f0'
    }
  }

  return (
    <Box style={style.box} id="saved-books" mainContainer>
      <label className="label">Public List</label>
      {list && list.length ?
        list.map(item => (
          <BookInfoDisplay
            book={item.book}
            key={item.book._id}
            openSaveBookModal={openSaveBookModal}
            openLoginModal={openLoginModal}
            openCreateAccountModal={openCreateAccountModal}
          />
        )) 
        :
        <h4 className="title is-6">
          {list ? 'There are no books saved to the public list yet.' : 'Fetching list...'}
        </h4>
      }
    </Box>
  );
}