import React from 'react';
import './style.css';
import SearchInput from '../input';

export default ({
  inputValue,
  handleChange,
  isLoading,
  submitSearch,
  titleInputValue,
  authorInputValue,
  publisherInputValue,
  subjectInputValue,
  isbnInputValue,
  showNewestFirst,
  errorMessage
}) => {

  return (
    <form id="search-form">
      <label className="label" htmlFor="search-input">
        Super Advanced Book Search:
      </label>
      {errorMessage &&
        <div className="notification is-danger has-shadow">
          {errorMessage}
        </div>
      }
      <SearchInput
        label="Title"
        id="search-title-input"
        placeholder="Search by title..."
        name="titleInput"
        value={titleInputValue}
        handleChange={handleChange}
        disabled={isLoading}
      />
      <SearchInput
        label="Author"
        id="search-author-input"
        placeholder="Search by author(s)..."
        name="authorInput"
        value={authorInputValue}
        handleChange={handleChange}
        disabled={isLoading}
      />
      <SearchInput
        label="Publisher"
        id="search-publisher-input"
        placeholder="Search by publisher..."
        name="publisherInput"
        value={publisherInputValue}
        handleChange={handleChange}
        disabled={isLoading}
      />
      <SearchInput
        label="Subject/Key Words"
        id="search-subject-input"
        placeholder="Search by subject..."
        name="subjectInput"
        value={subjectInputValue}
        handleChange={handleChange}
        disabled={isLoading}
      />
      <SearchInput
        label="ISBN"
        id="search-isbn-input"
        placeholder="Search by ISBN..."
        name="isbnInput"
        value={isbnInputValue}
        handleChange={handleChange}
        disabled={isLoading}
      />
      <div className="control">
        <label className="label">Order by:</label>
        <label className="radio">
          <input
            type="radio"
            value={false}
            name="showNewestFirst"
            checked={!showNewestFirst}
            onChange={handleChange}
            disabled={isLoading}
          />
          Most Relevant (Default)
        </label>
        <label className="radio">
          <input
            type="radio"
            value={true}
            name="showNewestFirst"
            checked={showNewestFirst}
            onChange={handleChange}
            disabled={isLoading}
          />
          Most Recently Published
        </label>
        <br />
      </div>
      <a
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="powered-by-google"
      >
        <img src="assets/images/poweredby.png" alt="Powered by Google" />
      </a>
      <button
        onClick={submitSearch}
        type="submit"
        className="button is-primary"
        disabled={isLoading || (!titleInputValue && !authorInputValue && !publisherInputValue && !subjectInputValue && !isbnInputValue)}
      >
        Search!
      </button>
    </form>
  );
};