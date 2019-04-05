import React from 'react';
import './style.css';

export default ({
  href,
  children,
  style,
  className
}) => {

  let linkClass = 'button is-primary is-outlined link-button';
  if (className) linkClass += ` ${className}`;

  return (
    <a
      href={href}
      className={linkClass}
      target="_blank"
      rel="noreferrer noopener"
      style={style || {}}
    >
      <span className="label">{children}</span>
    </a>
  );
}