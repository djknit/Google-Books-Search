import React from 'react';
import style from './style.css';

function button(props) {
  return(
    <button className="button is-primary home-btn" onClick={props.onClick}>{props.text}</button>
  );
}

export default button;