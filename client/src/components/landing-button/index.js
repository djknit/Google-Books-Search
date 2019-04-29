import React from 'react';

export default ({
  onClick,
  text
}) => {

  // Styles for classes 'button' and 'is-deep' are defined in App.css
  return (
    <button className="button is-primary is-deep" onClick={onClick}>{text}</button>
  );
} 