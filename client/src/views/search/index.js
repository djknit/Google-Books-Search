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
      input: '',
      query: null,
      results: {},
      isLoading: false
    };
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  submitSearch(event) {
    event.preventDefault();
    const { input } = this.state;
    this.setState({
      isLoading: true,
      query: input
    });
    api.search.submitSearch(this.state.input)
      .then(res => {
        console.log(res.data);
        this.setState({
          results: res.data,
          isLoading: false
        });
      });
  }

  render() {
    const { openSaveBookModal } = this.props;

    return(
      <div>
        <Hero pageName="Search for Books" />
        <SearchBar
          inputValue={this.state.input}
          handleChange={this.handleInputChange}
          submitSearch={this.submitSearch}
          isLoading={this.state.isLoading}
        />
        <SearchResults
          query={this.state.query}
          results={this.state.results}
          openSaveBookModal={openSaveBookModal}
        />
      </div>
    );
  }
}

export default searchView;