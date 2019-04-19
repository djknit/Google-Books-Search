import React from 'react';
import './style.css';
import Hero from '../../components/hero';

export default ({
  footerHeight
}) => {

  const style={
    componentRootEl: {
      minHeight: `calc(100vh - ${footerHeight + 53}px)`
    }
  }

  return(
    <div id="not-found" style={style.componentRootEl}>
      <Hero pageName="Page Not Found" />
      <div className="not-found-content has-text-centered">
        <h1 className="title is-size-1 four04">404</h1>
        <h1 className="title is-size-3">(Not Found)</h1>
        <hr />
        <p className="is-size-4">
          Oops... There doesn't seem to be a page at
        </p>
        <p className="is-size-3">
          {window.location.href}
        </p>
        <hr />
        <p className="is-size-5">
          Make sure that you have typed the address correctly, or use the links on the
          navigation bar at the top of the page to help find what you're looking for.
        </p>
      </div>
    </div>
  );
}