import React from 'react';
import Box from '../box';
import LinkButton from './link-button';
import './style.css';

function bookInfoDisplay({ book, openSaveBookModal, openLoginModal, openCreateAccountModal, ...otherProps }) {
  let style = {
    box: {
      textAlign: 'left',
      margin: '30px 0'
    },
    title: {
      textAlign: 'center',
      marginBottom: '.5rem'
    },
    subtitle: {
      textAlign: 'center',
      margin: '.5rem 0'
    },
    authors: {
      textAlign: 'center',
      margin: '.7rem 0 12px'
    },
    image: {
      width: 180,
      float: 'left',
      margin: '7px 10px 5px 0',
    },
    description: {
      marginBottom: 10
    },
    infoItem: {
      margin: '7px 0'
    },
    infoKey: {
      fontWeight: 500
    },
    divider: {
      margin: '5px 0',
      height: 1,
      backgroundColor: '#bbbbbb'
    },
    // source: https://stackoverflow.com/questions/218760/how-do-you-keep-parents-of-floated-elements-from-collapsing
    spacer: {
      clear: 'both'
    },
    linksDiv: {
      marginBottom: 10
    },
    link: {
      height: 52,
      width: 132,
      display: 'inline-block',
      borderRadius: 17
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
    textLink: {
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer'
    },
    saveButtonArea: {
      paddingTop: 10,
      textAlign: 'right',
      clear: 'both'
    },
    saveButton: {
      borderRadius: 8
    }
  };
  style.infoItemBold = Object.assign({ fontWeight: 500 }, style.infoItem);
  style.secondDivider = Object.assign({}, style.divider);
  style.secondDivider.margin ='15px 0 5px';
  style.previewButtonLink = Object.assign({ position: 'relative', marginRight: 'calc(50% - 198px)' }, style.link);
  style.thirdLinkButton = Object.assign({ float: 'right' }, style.link);

  function save() {
    console.log(book);
    openSaveBookModal(book, true);
  }


  return(
    <Box style={style.box}>
      <h5 className="title is-5" style={style.title}>{book.title}</h5>
      {book.subtitle && 
        <h5 className="subtitle is-5" style={style.subtitle}>{book.subtitle}</h5>
      }
      {book.authors ?
        <h5 className="subtitle is-5" style={style.authors}>
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
        </h5> :
        <h5 className="subtitle is-5" style={style.authors}>Author unknown</h5>
      }
      <div className="content">
        {book.image &&
          <img src={book.image} alt={book.title} style={style.image} />
        }
        {book.description &&
          <>
            <p style={style.description}>
              {book.description}
            </p>
            <hr style={style.divider} />
          </>
        }
        {book.language &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>Language:</span> {book.language}
          </p>
        }
        {book.publisher &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>Publisher:</span> {book.publisher}
          </p>
        }
        {book.pageCount &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>Page Count:</span> {book.pageCount} pages</p>
        }
        {book.isbn && book.isbn.isbn10 &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>ISBN 10:</span> {book.isbn.isbn10}
          </p>
        }
        {book.isbn && book.isbn.isbn13 &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>ISBN 13:</span> {book.isbn.isbn13}
          </p>
        }
        {book.viewability && book.viewability.level &&
          <p style={style.infoItem}>
            <span style={style.infoKey}>Viewability:</span> {book.viewability.level}
          </p>
        }
        {book.isMature &&
          <p style={style.infoItemBold}>Contains mature content.</p>
        }
        <div style={style.spacer}></div>
        <hr style={style.secondDivider} />
        {book.links &&
          <div className="content" style={style.linksDiv}>
            <p style={style.infoItemBold}>Links:</p>
            {book.links.preview &&
              <a href={book.links.preview} target="_blank" rel="noreferrer noopener" className="preview link-button" style={style.previewButtonLink} >
                <img src="/assets/images/gbs_preview_button.png" alt="open preview" style={style.previewButton} />
              </a>
            }
            {book.links.webReader &&
              <LinkButton href={book.links.webReader} style={style.link}>Open in Web Reader</LinkButton>
            }
            {book.links.info &&
              <LinkButton href={book.links.info} style={style.thirdLinkButton}>Go to Information Page</LinkButton>
            }
          </div>
        }
        <hr style={style.divider} />
        <div style={style.saveButtonArea}>
          <button onClick={save} className="button is-primary">Save</button>
        </div>
      </div>
    </Box>
  );
}

export default bookInfoDisplay;