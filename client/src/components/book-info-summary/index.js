import React from 'react';

export default ({
  book,
  isSmall
}) => {

  return (
    <div className="content has-text-centered is-marginless" >
      {book.subtitle ?
        <p>
          <span className={isSmall ? 'title is-6' : 'title is-4'}>"{book.title}</span> 
          <span className={isSmall ? 'title is-6' : 'title is-4'}>&mdash; {book.subtitle}"</span>
        </p> :
        <p><span className={isSmall ? 'title is-6' : 'title is-4'}>"{book.title}"</span></p>
      }
      <p className={`is-marginless is-size-${isSmall ? '6' : '4'}`}>
        {book.authors ?
          <>
            By
            <span>{book.authors.length > 2 ?
              book.authors.map((author, i, arr) => (
                i < arr.length - 1 ?
                  ` ${author}, ` :
                  `and ${author}`
              )) :
              book.authors.map((author, i) => (
                i < 1 ?
                  ` ${author}` :
                  ` and ${author}`
              ))
            }</span>
          </> :
          'Author unknown'
        }
      </p>
    </div>
  );
}