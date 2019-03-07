import React from 'react';
import Box from '../box'

function searchBar(props) {
  const style = {
    form: {
      textAlign: 'right'
    },
    label: {
      textAlign: 'left'
    },
    button: {
      marginTop: 15
    },
    box: {
      backgroundColor: '#fdfdfd'
    }
  }

  return(
    <Box style={style.box}>
      <form style={style.form}>
        <div className="field">
          <label className="label" htmlFor="search-input" style={style.label}>Search Books</label>
          <div className="control has-icons-left">
            <input id="search-input" className="input" placeholder="Enter an author or title..." onChange={props.handleChange} />
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <button onClick={props.submitSearch} type="submit" className="button is-primary" style={style.button}>Go!</button>
      </form>
    </Box>
  );
}

export default searchBar;