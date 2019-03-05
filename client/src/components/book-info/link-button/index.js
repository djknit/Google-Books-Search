import React from 'react';

function button(props) {
  const style = {
    button: props.style || {},
    label: {
      fontSize: 12,
      whiteSpace: 'normal'
    }
  }

  return(
    <a
      href={props.href}
      className="button is-primary is-outlined link-button"
      target="_blank"
      rel="noreferrer noopener"
      style={style.button}
    >
      <span className="label" style={style.label}>{props.children}</span>
    </a>
  );
}

export default button;