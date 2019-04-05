import React from 'react';
import './style.css';

export default ({
  pageName,
  isMedium,
  is404
}) => { 

  return (
    <>
      <section className={`hero is-primary is-bold${isMedium ? " is-medium" : ""}`}>
        <div className="hero-body has-shadow is-deep is-low">
          <div className="container">
            <h1 className="title">
              {is404 ? '404' : 'Book Search App'}
            </h1>
            <h2 className="subtitle">
              {pageName}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}