import React from 'react';
import Box from '../../../box';

function BookInfoSummary(props) {
  const style = {

  }

  return (
    <div className="content has-text-centered is-marginless" >
      {props.book.subtitle ?
        <p>
          <span className={props.isSmall ? 'title is-6' : 'title is-4'}>"{props.book.title}</span> 
          <span className={props.isSmall ? 'title is-6' : 'title is-4'}>&mdash; {props.book.subtitle}"</span>
        </p> :
        <p><span className={props.isSmall ? 'title is-6' : 'title is-4'}>"{props.book.title}"</span></p>
      }
      <p className={`is-marginless is-size-${props.isSmall ? '6' : '4'}`}>
        {props.book.authors ?
          <>
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
          </> :
          'Author unknown'
        }
      </p>
    </div>
  );
}

export default BookInfoSummary;