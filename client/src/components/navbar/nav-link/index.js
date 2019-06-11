import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default ({
  path,
  text,
  onClick,
  tabIndex
}) => {

  return (
    path ?
      <Link
        to={path}
        className={window.location.pathname === path ? "navbar-item is-active" : "navbar-item"}
      >
        {text}
      </Link>
      :
      <span
        className={window.location.pathname === path ? "navbar-item is-active" : "navbar-item"}
        onClick={onClick}
      >
        {text}
      </span>
  );
}