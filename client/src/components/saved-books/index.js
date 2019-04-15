import React from 'react';
import './style.css';
import Box from '../box';
import BookInfoDisplay from '../book-info';

export default ({
  list,
  openSaveBookModal,
  isPublicList,
  isUserList,
  errorMessage,
  hasError,
  user,
  openLoginModal,
  openCreateAccountModal,
  updateList,
  openDeleteBookModal
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
      {list && list.length && !hasError ?
        list.map((item, index) => (
          <BookInfoDisplay
            book={item.book}
            key={item._id}
            openSaveBookModal={openSaveBookModal}
            timeAdded={item.timeAdded}
            addedBy={item.addedBy}
            isPublicList={isPublicList}
            isUserList={isUserList}
            comments={item.notes}
            listItemId={item._id}
            listItemArrayIndex={index}
            user={user}
            openLoginModal={openLoginModal}
            openCreateAccountModal={openCreateAccountModal}
            updateList={updateList}
            openDeleteBookModal={openDeleteBookModal}
          />
        )) 
        :
        <h4 className="title is-6">
          {list ?
            hasError ?
              <>
                Oops! An error occured.<br />{errorMessage}<br />
                Try reloading the page.<br /><br /><br />Sorry about that.
              </>
              :
              `There are no books saved to ${isPublicList ? 'the public' : 'your'} list yet.`
            :
            hasError ?
              <>There was an error retrieving the list.<br /><br />{errorMessage}</>
              :
              <>Fetching list...</>
          }
        </h4>
      }
    </Box>
  );
}