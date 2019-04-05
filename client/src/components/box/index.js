import React from 'react';
import './style.css';

export default ({
  style,
  className,
  id,
  mainContainer,
  children
}) => {
  
  let boxClass = 'box has-shadow';
  if (className) boxClass += ` ${className}`;
  if (mainContainer) boxClass += ' is-deep has-text-centered';

  return (id ?
    <div className={boxClass} id={id} style={style || {}}>
      {children}
    </div>
    :
    <div className={boxClass} style={style || {}}>
      {children}
    </div>
  );
}