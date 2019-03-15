import React from 'react';
import './style.css';

function box(props) {
  let style = props.style || {};
  if (props.mainContainer) {
    const minWidth = 485;
    style = Object.assign({ minWidth }, props.style);
  }

  return(
    <div className='box' style={style}>
      {props.children}
    </div>
  );
}

export default box;