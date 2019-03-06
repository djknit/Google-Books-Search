import React from 'react';
import Box from '../box';
import BookInfoDisplay from '../book-info';

function resultsDisplay({ results, openSaveBookModal, ...otherProps }) {
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
  style.boxNoResults = Object.assign({ backgroundColor: '#eaeaea' }, style.box);

  console.log(results);

  return(results.items ?
    <Box style={style.boxHasResults} id="search-results">
      <h4 className="label" style={style.label}>Results:</h4>
      {results.items.map(item => (
        <BookInfoDisplay book={item} key={item.gId} openSaveBookModal={openSaveBookModal} />
      ))}
    </Box> :
    <Box style={style.boxNoResults} id="search-results">
      <h4 className="title is-6">There are no results to display yet.</h4>
      <h5 className="subtitle is-6">Search for a book using the search bar above.</h5>
    </Box>
  );
}

export default resultsDisplay;