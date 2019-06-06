import React, { Component } from 'react';
import Hero from '../../components/hero';
import SearchBar from '../../components/search-bar';
import SearchResults from '../../components/search-results';
import api from '../../utilities/api';

class searchView extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchType = this.toggleSearchType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateQuery =this.generateQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      inputBasic: '',
      query: null,
      queryHasShowNewestFirst: false,
      results: {},
      isLoading: false,
      isAdvancedSearchShowing: false,
      titleInput: '',
      authorInput: '',
      publisherInput: '',
      subjectInput: '',
      isbnInput: '',
      showNewestFirst: false,
      basicErrorMessage: null,
      advancedErrorMessage: null
    };
  }

  toggleSearchType(isSwitchingToAdvanced) {
    if (isSwitchingToAdvanced) {
      return this.setState({ isAdvancedSearchShowing: true });
    }
    else {
      return this.setState({ isAdvancedSearchShowing: false });
    }
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    const recordedValue = name === 'showNewestFirst' ?
      value === ('true' || true) :
      value;
    this.setState({ [name]: recordedValue });
  }

  generateQuery() {
    let query = '';
    let queryDescription = '';
    const { showNewestFirst, isAdvancedSearchShowing } = this.state;
    if (!isAdvancedSearchShowing) {
      query = this.state.inputBasic.trim();
      if (query === '/') return this.setState({
        basicErrorMessage: 'Cannot search "/".'
      });
      else if (query === '') return this.setState({
        basicErrorMessage: 'Cannot submit an empty search.'
      });
      else this.setState({ basicErrorMessage: null });
      queryDescription = `"${query}"`;
    }
    else {
      let {
        titleInput,
        authorInput,
        publisherInput,
        subjectInput,
        isbnInput
      } = this.state;
      titleInput = titleInput.trim();
      authorInput = authorInput.trim();
      publisherInput = publisherInput.trim();
      subjectInput = subjectInput.trim();
      isbnInput = isbnInput.trim();
      if (titleInput) {
        query += `+intitle:${titleInput}`;
        queryDescription += `Title: "${titleInput}"`;
      }
      if (authorInput) {
        query += `+inauthor:${authorInput}`;
        if (queryDescription !== '') queryDescription += ', '; 
        queryDescription += `Author: "${authorInput}"`;
      }
      if (publisherInput) {
        query += `+inpublisher:${publisherInput}`;
        if (queryDescription !== '') queryDescription += ', '; 
        queryDescription += `Publisher: "${publisherInput}"`;
      }
      if (subjectInput) {
        query += `+subject:${subjectInput}`;
        if (queryDescription !== '') queryDescription += ', '; 
        queryDescription += `Subject: "${subjectInput}"`;
      }
      if (isbnInput) {
        query += `+isbn:${isbnInput}`;
        if (queryDescription !== '') queryDescription += ', '; 
        queryDescription += `ISBN: "${isbnInput}"`;
      }
      if (!query) return this.setState({
        advancedErrorMessage: 'Cannot submit an empty query.'
      });
    }
    this.setState({
      isLoading: true
    });
    return {
      query: {
        query,
        newestFirst: isAdvancedSearchShowing && showNewestFirst
      },
      queryDescription
    };
  }

  submitSearch(event) {
    event.preventDefault();
    const { query, queryDescription } = this.generateQuery() || {};
    console.log(query)
    if (!query) return undefined;
    api.search.submitSearch(query)
      .then(res => {
        console.log(res.data);
        this.setState({
          results: res.data,
          query: queryDescription,
          queryHasShowNewestFirst: query.newestFirst,
          isLoading: false
        });
      })
      .catch(err => this.setState({
        isLoading: false,
        errorMessage: err || 'Unknown error.'
      }));      
  }

  render() {
    const { openSaveBookModal } = this.props;

    return(
      <div>
        <Hero pageName="Search for Books" />
        <SearchBar
          inputValue={this.state.inputBasic}
          handleChange={this.handleInputChange}
          submitSearch={this.submitSearch}
          isLoading={this.state.isLoading}
          isAdvancedSearchShowing={this.state.isAdvancedSearchShowing}
          toggleSearchType={this.toggleSearchType}
          titleInputValue={this.state.titleInput}
          authorInputValue={this.state.authorInput}
          publisherInputValue={this.state.publisherInput}
          subjectInputValue={this.state.subjectInput}
          isbnInputValue={this.state.isbnInput}
          showNewestFirst={this.state.showNewestFirst}
          basicErrorMessage={this.state.basicErrorMessage}
          advancedErrorMessage={this.state.advancedErrorMessage}
        />
        <SearchResults
          query={this.state.query}
          results={this.state.results}
          openSaveBookModal={openSaveBookModal}
          titleInputValue={this.state.titleInput}
          authorInputValue={this.state.authorInput}
          publisherInputValue={this.state.publisherInput}
          subjectInputValue={this.state.subjectInput}
          isbnInputValue={this.state.isbnInput}
          showNewestFirst={this.state.isAdvancedSearchShowing && this.state.queryHasShowNewestFirst}
        />
      </div>
    );
  }
}

export default searchView;