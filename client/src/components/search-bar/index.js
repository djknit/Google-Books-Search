import React from 'react';
import Box from '../box'

function navbar(props) {
  const style = {
    form: {
      textAlign: 'right'
    },
    label: {
      textAlign: 'left'
    },
    button: {
      marginTop: 15
    }
  }

  function submitForm(event) {
    event.preventDefault();
    const input = document.getElementById('search-input');
    console.log(input.value);
    input.value = '';
  }

  return(
    <Box>
      <form style={style.form}>
        <div className="field">
          <label className="label" htmlFor="search-input" style={style.label}>Search Google Books</label>
          <div className="control has-icons-left">
            <input id="search-input" className="input" placeholder="Enter an author or title..."></input>
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <button onClick={submitForm} type="submit" className="button is-primary" style={style.button}>Go!</button>
      </form>
    </Box>
  );
}

export default navbar;