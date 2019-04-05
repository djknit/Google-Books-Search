import React from 'react';
import Box from '../../../box';

export default ({
  book,
  isPublic,
  isUser
}) => {

  return (
    <div className="content has-text-centered">
      <p className="is-size-5 has-text-left">You are about to save...</p>
      <Box>
        {book.subtitle ?
          <p><span className="title is-4">"{book.title}</span> <span className="subtitle is-4">&mdash; {book.subtitle}"</span></p> :
          <p><span className="title is-4">"{book.title}"</span></p>
        }
        {book.authors ?
          <p className="is-size-4">
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
          </p> :
          <p>Author unknown</p>
        }
      </Box>
      <p className="is-size-5 has-text-right">
        {isPublic &&
          '...to the public list.'
        }
        {isUser &&
          '...to your personal list.'
        }
      </p>
    </div>
  )
}