import React from 'react';

function hero(props) {
  return(
    <section className={`hero is-primary is-bold${props.isMedium ? " is-medium" : ""}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {props.is404 ? '404' : 'Google Books Search App'}
          </h1>
          <h2 className="subtitle">
            {props.pageName}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default hero;