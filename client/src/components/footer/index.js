import React from 'react';
import './style.css';

export default ({
  height
}) => {
  
  return(
    <footer id="my-footer" className="has-shadow is-deep is-low" style={{ height }}>
      <span className="footer-text developed-by">
        Developed by&nbsp;
        <a href="http://djknit.github.io/" target="_blank" rel="noreferrer noopener">
          David Knittel
        </a>
      </span>
      <span className="footer-text site-links">
        <a
          href="http://github.com/djknit/Google-Books-Search/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Repo
        </a>
        <span className="separator"> | </span>
        <a
          href="https://djknit.github.io/assets/documents/book-search.html"
          target="_blank"
          rel="noreferrer noopener"
        >
          Readme
        </a>
      </span>
    </footer>
  );
}