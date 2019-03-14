import React from 'react';
import Box from '../../../box';

function BookInfoSummary(props) {
  return (
    <div className="content has-text-centered" >
      {props.book.subtitle ?
        <p>
          <span className={props.isSmall ? 'title is-6' : 'title is-4'}>"{props.book.title}</span> 
          <span className={props.isSmall ? 'title is-6' : 'title is-4'}>&mdash; {props.book.subtitle}"</span>
        </p> :
        <p><span className={props.isSmall ? 'title is-6' : 'title is-4'}>"{props.book.title}"</span></p>
      }
      {props.book.authors ?
        <p className={props.isSmall ? 'is-size-6' : 'is-size-4'}>
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
      <hr style={{ height: 1, backgroundColor: '#a7a7a7', width: '50%', display: 'inline-block', margin: 0 }}></hr>
    </div>
  );
}

export default BookInfoSummary;