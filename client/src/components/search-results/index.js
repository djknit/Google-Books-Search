import React from 'react';
import Box from '../box';
import BookInfoDisplay from '../book-info';

function resultsDisplay({ results, query, openSaveBookModal, openLoginModal, openCreateAccountModal, ...otherProps }) {
  console.log(otherProps)
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

  console.log(results);

  return(results.items ?
    <Box style={style.boxHasResults} id="search-results">
      <label className="label" style={style.label}>Results</label>
      {/* <Box style={{ margin: '7px 0', boxShadow: '1px 2px 3px #808080' }} className="content"> */}
        <p className="is-size-5">Showing {results.items.length} of {results.number} matches for "{query}"</p>
      {/* </Box> */}
      {results.items.map(item => (
        <BookInfoDisplay book={item} key={item.gId} openSaveBookModal={openSaveBookModal} openLoginModal={openLoginModal} openCreateAccountModal={openCreateAccountModal}/>
      ))}
    </Box> :
    <Box style={style.boxNoResults} id="search-results">
      <label className="label" style={style.label}>Results</label>
      <h4 className="title is-6">There are no results to display yet.</h4>
      <h5 className="subtitle is-6">Search for a book using the search bar above.</h5>
    </Box>
  );
}

export default resultsDisplay;