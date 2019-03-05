import React from 'react';

function button(props) {
  const style = {
    button: props.style || {},
    label: {
      fontSize: 12,
      whiteSpace: 'normal'
    }
  };
  style.button.margin = '0 15px';

  function handleClick() {
    return props.handleClick(props.bookId);
  }

  return(
    <button
      className="button is-success is-outlined link-button"
      style={style.button}
      onClick={handleClick}
    >
      <span className="label" style={style.label}>{props.children}</span>
    </button>
  );
}

export default button;