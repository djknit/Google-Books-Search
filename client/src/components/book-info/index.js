import React from 'react';
import Box from '../box';
import './style.css';

function bookInfoDisplay({ book, ...otherProps }) {
  const style = {
    box: {
      textAlign: 'left'
    },
    title: {
      textAlign: 'center'
    },
    image: {
      height: 200,
      width: 'auto',
      float: 'left',
      marginRight: 10
    },
    previewButton: {
      height: 50,
      width: 142,
      maxWidth: 142,
      cursor: 'pointer',
      position: 'absolute',
      left: -12,
      display: 'inline-block'
    },
    previewButtonLink: {
      height: 52,
      width: 132,
      display: 'inline-block',
      position: 'relative',
      borderRadius: 17,
      marginLeft: 12
    },
    // source: https://stackoverflow.com/questions/218760/how-do-you-keep-parents-of-floated-elements-from-collapsing
    spacer: {
      clear: 'both'
    }
  }

  return(
    <Box style={style.box}>
      <h5 className="title is-5" style={style.title}>{book.title}</h5>
      {book.subtitle && 
        <h5 className="subtitle is-5" style={style.title}>{book.subtitle}</h5>
      }
      {book.image &&
        <img src={book.image} alt={book.title} style={style.image} />
      }
      {book.authors ?
        <p style={{ fontSize: '1.2em' }}>
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
        <p style={{ fontSize: '1.2em' }}>Author unknown</p>
      }
      {book.isMature &&
        <p style={{ fontWeight: 'bold' }}>Contains mature content.</p>
      }
      {book.description &&
        <p>{book.description}</p>
      }
      {book.links.preview &&
        <a href={book.links.preview} target="_blank" rel="noreferrer noopener" className="preview-button-link" style={style.previewButtonLink} >
          <img src="/assets/images/gbs_preview_button.png" alt="open preview" style={style.previewButton} />
        </a>
      }
      <div style={style.spacer}></div>
    </Box>
  );
}

export default bookInfoDisplay;