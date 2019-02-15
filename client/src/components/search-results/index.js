import React from 'react';
import Box from '../box';

function resultsDisplay(props) {
  const style = {
    box: {
      minHeight: 200,
      textAlign: 'center'
    }
  }

  return(
    <Box style={style.box} id="search-results">
      <h4 className="subtitle is-6">There are no results to display yet.</h4>
      <h5 className="subtitle is-6">Search for a book using the search bar above.</h5>
    </Box>
  );
}

export default resultsDisplay;