import React from 'react';
import Box from '../box';
import BookInfoDisplay from '../book-info';

function resultsDisplay({ results, ...otherProps }) {
  const style = {
    box: {
      minHeight: 200,
      textAlign: 'center'
    },
    label: {
      textAlign: 'left'
    }
  }

  console.log(results);

  return(results.items ?
    <Box style={style.box} id="search-results">
      <h4 className="label" style={style.label}>Results:</h4>
      {results.items.map(item => (
        <BookInfoDisplay book={item} key={item.gId} />
      ))}
    </Box> :
    <Box style={style.box} id="search-results">
      <h4 className="title is-6">There are no results to display yet.</h4>
      <h5 className="subtitle is-6">Search for a book using the search bar above.</h5>
    </Box>
  );
}

export default resultsDisplay;