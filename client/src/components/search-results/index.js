import React from 'react';
import './style.css';
import Box from '../box';
import BookInfoDisplay from '../book-info';

export default ({
  results,
  query,
  openSaveBookModal,
  titleInputValue,
  showNewestFirst 
}) => {

  let style = {
    box: {
      minHeight: 200,
      backgroundColor: results.items ? '#fafafa' : '#f0f0f0'
    }
  }
  if (results) style.box.paddingBottom = 1

  return (
    <Box style={style.box} id="search-results" mainContainer>
      <label className="label">Results</label>
      {results.items ?
        <>
          {results.items.length > 0 ?
            <>
              <p className="is-size-5">
                Showing {results.items.length} of&nbsp;
                {results.number} matches for <em>{query}</em>
              </p>
              <p className="is-size-5">
                {showNewestFirst &&
                  <>(Newest first.)</>
                }
              </p>
              {results.items.map(item => (
                <BookInfoDisplay
                  book={item}
                  key={item.gId}
                  openSaveBookModal={openSaveBookModal}
                />
              ))}
            </>
            :
            <>
              <p className="is-size-5">
                Sorry, no matches were found for <em>{query}</em>.
              </p>
            </>
          }
        </>
        :
        <>
          <h4 className="title is-6">There are no results to display yet.</h4>
          <h5 className="subtitle is-6">Search for a book using the search bar above.</h5>
        </>
      }
    </Box>
  );
}