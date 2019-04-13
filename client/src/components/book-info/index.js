import React from 'react';
import './style.css';
import moment from 'moment';
import Box from '../box';
import LinkButton from './link-button';
import CommentsSection from './comments';

export default ({
  book,
  openSaveBookModal,
  timeAdded,
  addedBy,
  isPublicList,
  comments,
  listItemId,
  user,
  openCreateAccountModal,
  openLoginModal,
  updateList
}) => {
  
  const style = {
    box: {
      textAlign: 'left',
      margin: '30px 0',
      backgroundColor: 'white'
    }
  };

  const save = () => openSaveBookModal(book, true);

  return (
    <Box style={style.box} className="book-info-display is-deep">
      {timeAdded &&
        <div className="content book-save-info">
          <p>
            Saved {moment(timeAdded).calendar()}
            {isPublicList && <> by {addedBy || <em>anonymous</em>}</>}
          </p>
          <hr className="divider" />
        </div>
      }
      <h5 className="title is-5">{book.title}</h5>
      {book.subtitle && 
        <h5 className="subtitle is-5">{book.subtitle}</h5>
      }
      {book.authors ?
        <h5 className="subtitle is-5 author">
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
        <h5 className="subtitle is-5 author">Author unknown</h5>
      }
      <div className="content book-info">
        {book.image &&
          <img src={book.image} alt={book.title}/>
        }
        {book.description &&
          <>
            <p className="description">
              {book.description}
            </p>
            <hr className="divider" />
          </>
        }
        {book.language &&
          <p className="info-item">
            <span className="info-item-key">Language:</span> {book.language}
          </p>
        }
        {book.publisher &&
          <p className="info-item">
            <span className="info-item-key">Publisher:</span> {book.publisher}
          </p>
        }
        {book.pageCount &&
          <p className="info-item">
            <span className="info-item-key">Page Count:</span> {book.pageCount} pages</p>
        }
        {book.isbn && book.isbn.isbn10 &&
          <p className="info-item">
            <span className="info-item-key">ISBN 10:</span> {book.isbn.isbn10}
          </p>
        }
        {book.isbn && book.isbn.isbn13 &&
          <p className="info-item">
            <span className="info-item-key">ISBN 13:</span> {book.isbn.isbn13}
          </p>
        }
        {book.viewability && book.viewability.level &&
          <p className="info-item">
            <span className="info-item-key">Viewability:</span> {book.viewability.level}
          </p>
        }
        {book.isMature &&
          <p className="info-item-bold">Contains mature content.</p>
        }
        <div className="spacer"></div>
        <hr className="divider middle" />
        {book.links &&
          <div className="content links">
            <p className="info-item-bold">Links:</p>
            {book.links.preview &&
              <a href={book.links.preview} target="_blank" rel="noreferrer noopener" className="preview link-button">
                <img src="/assets/images/gbs_preview_button.png" alt="open preview" />
              </a>
            }
            {book.links.webReader &&
              <LinkButton href={book.links.webReader} className="link-button">Open in Web Reader</LinkButton>
            }
            {book.links.info &&
              <LinkButton href={book.links.info} className="link-button">
                <span className="go-to">Go to </span>Information Page
              </LinkButton>
            }
          </div>
        }
        <hr className="divider" />
        <div className="lower-button-area">
          <button onClick={save} className="button is-primary">Save</button>
          {comments &&
            <CommentsSection
              isPublicList={isPublicList}
              listItemId={listItemId}
              comments={comments}
              user={user}
              openCreateAccountModal={openCreateAccountModal}
              openLoginModal={openLoginModal}
              updateList={updateList}
            />
          }
        </div>
      </div>
    </Box>
  );
}