import React from 'react';
import './style.css';
import Box from '../box';

export default ({
  inputValue,
  handleChange,
  submitSearch,
  isLoading
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
          <li>
            <a>
              <span className="icon is-small"><i class="fas fa-minus" /></span>
              <span>Basic</span>
            </a>
          </li>
          <li className="is-active">
            <a>
              <span className="icon is-small"><i class="fas fa-bars" /></span>
              <span>Advanced</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="search-tabs-cover" />
      <form id="search-form">
        <div className="field">
          <label className="label" htmlFor="search-input">
            Search Books
          </label>
          <div className="control has-icons-left">
            <input
              id="search-input"
              className="input has-shadow"
              placeholder="Enter an author or title..."
              value={inputValue}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="powered-by-google"
        >
          <img src="assets/images/poweredby.png" alt="Powered by Google" />
        </a>
        <button onClick={submitSearch} type="submit" className="button is-primary" disabled={isLoading || !inputValue}>
          Search!
        </button>
      </form>
    </Box>
  );
}