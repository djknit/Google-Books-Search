import React from 'react';
import './style.css';

function footer({ height }) {
  return(
    <footer id="my-footer" style={{ height, bottom: -1 * height }}>
      <div class="shadow"></div>
    </footer>
  );
}

export default footer;