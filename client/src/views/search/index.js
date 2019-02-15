import React from 'react';
import Hero from '../../components/hero';
import SearchBar from '../../components/search-bar';
import SearchResults from '../../components/search-results';

function searchView(props) {
  return(
    <div>
      <Hero pageName="Search for Books" />
      <SearchBar />
      <SearchResults />
    </div>
  );
}

export default searchView;