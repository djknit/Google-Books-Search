import React from 'react';
import './style.css';

function hero({ pageName, isMedium, is404 }) {
  return(<>
    <section className={`hero is-primary is-bold${isMedium ? " is-medium" : ""}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {is404 ? '404' : 'Book Search App'}
          </h1>
          <h2 className="subtitle">
            {pageName}
          </h2>
        </div>
      </div>
      <div className="shadow"></div>
      <div className="shadow-cover"></div>
    </section>
  </>);
}

export default hero;