import React from 'react';

function button(props) {
  const style = {
    button: props.style || {},
    label: {
      fontSize: 12,
      whiteSpace: 'normal'
    }
  };

  return(
    <button
      className="button is-success is-outlined link-button"
      style={style.button}
      onClick={props.handleClick}
    >
      <span className="label" style={style.label}>{props.children}</span>
    </button>
  );
}

export default button;