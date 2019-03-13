import React from 'react';
import Box from '../../../box';

function ConfirmSaveBody(props) {
  return (
    <div className="content has-text-centered">
      <p className="is-size-5 has-text-left">You are about to save...</p>
      <Box>
        {props.book.subtitle ?
          <p><span className="title is-4">"{props.book.title}</span> <span className="subtitle is-4">&mdash; {props.book.subtitle}"</span></p> :
          <p><span className="title is-4">"{props.book.title}"</span></p>
        }
        {props.book.authors ?
          <p className="is-size-4">
            By
            <span>{props.book.authors.length > 2 ?
              props.book.authors.map((author, i, arr) => (
                i < arr.length - 1 ?
                  ` ${author}, ` :
                  `and ${author}`
              )) :
              props.book.authors.map((author, i) => (
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
        {props.isPublic ? '...to the public list.' : '...to your personal list.'}
      </p>
    </div>
  )
}

module.exports = ConfirmSaveBody;