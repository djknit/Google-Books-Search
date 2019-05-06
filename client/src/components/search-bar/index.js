import React from 'react';
import './style.css';
import Box from '../box';
import BasicSearch from './basic';
import AdvancedSearch from './advanced';

export default ({
  inputValue,
  handleChange,
  submitSearch,
  isLoading,
  isAdvancedSearchShowing,
  toggleSearchType,
  titleInputValue,
  authorInputValue,
  publisherInputValue,
  subjectInputValue,
  isbnInputValue,
  showNewestFirst,
  basicErrorMessage,
  advancedErrorMessage
}) => {

  const style = {
    box: {
      backgroundColor: '#fdfdfd',
      marginTop: 60
    }
  }

  return (
    <Box style={style.box} mainContainer>
      <div className="tabs is-boxed" id="searchbox-tabs">
        <ul>
          <li className={!isAdvancedSearchShowing ? 'is-active' : ''}>
            <a onClick={() => toggleSearchType(false)}>
              <span className="icon is-small"><i className="fas fa-minus" /></span>
              <span>Basic</span>
            </a>
          </li>
          <li className={isAdvancedSearchShowing ? 'advanced is-active' : 'advanced'}>
            <a onClick={() => toggleSearchType(true)}>
              <span className="icon is-small"><i className="fas fa-bars" /></span>
              <span>Advanced</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="search-tabs-cover" />
      {isAdvancedSearchShowing ?
        <AdvancedSearch
          inputValue={inputValue}
          handleChange={handleChange}
          isLoading={isLoading}
          submitSearch={submitSearch}
          isAdvancedSearchShowing={isAdvancedSearchShowing}
          toggleSearchType={toggleSearchType}
          titleInputValue={titleInputValue}
          authorInputValue={authorInputValue}
          publisherInputValue={publisherInputValue}
          subjectInputValue={subjectInputValue}
          isbnInputValue={isbnInputValue}
          showNewestFirst={showNewestFirst}
          errorMessage={advancedErrorMessage}
        />
        :
        <BasicSearch
          inputValue={inputValue}
          handleChange={handleChange}
          isLoading={isLoading}
          submitSearch={submitSearch}
          errorMessage={basicErrorMessage}
        />
        
      }
    </Box>
  );
}