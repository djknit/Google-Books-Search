import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function navLink(props) {
  return(
    <Link to={props.path} className={window.location.pathname === props.path ? "navbar-item is-active" : "navbar-item"} >
      {props.text}
    </Link>
  );
}

export default navLink;