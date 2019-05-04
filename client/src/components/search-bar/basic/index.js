import React from 'react';
import SearchInput from '../input';

export default ({
  inputValue,
  handleChange,
  isLoading,
  submitSearch,
  errorMessage
}) => {

  return (
    <form id="search-form">
      {errorMessage &&
        <div className="notification is-danger has-shadow">
          {errorMessage}
        </div>
      }
      <SearchInput
        id="search-input"
        placeholder="Enter an author or title..."
        name="inputBasic"
        value={inputValue}
        handleChange={handleChange}
        disabled={isLoading}
        label="Search Books"
      />
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
  );
};