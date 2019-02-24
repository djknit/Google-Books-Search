import React, { Component } from 'react';
import Hero from '../../components/hero';
import SearchBar from '../../components/search-bar';
import SearchResults from '../../components/search-results';
import api from '../../utilities/api';

class searchView extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      query: '',
      results: []
    };
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  submitSearch(event) {
    event.preventDefault();
    console.log(this.state.query);
    api.search.submitSearch(this.state.query)
      .then(res => console.log(res.data));
  }

  render() {
    return(
      <div>
        <Hero pageName="Search for Books" />
        <SearchBar handleChange={this.handleInputChange} submitSearch={this.submitSearch} />
        <SearchResults />
      </div>
    );
  }
}

export default searchView;