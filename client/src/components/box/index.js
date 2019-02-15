import React from 'react';
import './style.css';

function box(props) {
  return(
    <div className='box' style={props.style}>
      {props.children}
    </div>
  );
}

export default box;