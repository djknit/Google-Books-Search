import React from 'react';
import './style.css';
import Box from '../box';
import BookInfoDisplay from '../book-info';

export default ({
  list,
  openSaveBookModal,
  isPublicList,
  errorMessage,
  hasError,
  user,
  openLoginModal,
  openCreateAccountModal
}) => {

  const style = {
    box: {
      minHeight: 200,
      backgroundColor: list ? '#fafafa' : '#f0f0f0'
    }
  }

  return (
    <Box style={style.box} id="saved-books" mainContainer>
      <label className="label">
        {isPublicList ? 'Public' : 'Your'} List
      </label>
      {list && list.length ?
        list.map((item, index) => (
          <BookInfoDisplay
            book={item.book}
            key={item._id}
            openSaveBookModal={openSaveBookModal}
            timeAdded={item.timeAdded}
            addedBy={item.addedBy}
            isPublicList={isPublicList}
            comments={item.notes}
            listItemId={item._id}
            listItemArrayIndex={index}
            user={user}
            openLoginModal={openLoginModal}
            openCreateAccountModal={openCreateAccountModal}
          />
        )) 
        :
        <h4 className="title is-6">
          {list ?
            `There are no books saved to ${isPublicList ? 'the public' : 'your'} list yet.`
            :
            hasError ?
              <>There was an error retrieving the list.<br /><br />{errorMessage}</>
              :
              'Fetching list...'
          }
        </h4>
      }
    </Box>
  );
}