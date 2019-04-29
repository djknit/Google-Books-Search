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
      backgroundColor: '#fdfdfd'
    }
  }

  return (
    <Box style={style.box} mainContainer>
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