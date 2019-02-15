import React from 'react';

function button(props) {
  return(
    <button className="button" onClick={props.onClick}>{props.text}</button>
  );
}

export default button;