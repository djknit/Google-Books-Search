import React from 'react';
import './style.css';
import Hero from '../../components/hero';
import Box from '../../components/box';
import Button from '../../components/landing-button';

function searchView(props) {
  const style = {
    box: {
      textAlign: 'center',
      paddingBottom: 50
    },
    title: { marginTop: 30 }
  }

  return(
    <div>
      <Hero pageName="Welcome to David's Google Books Searcher" />
      <Box style={style.box}>
        <div className="landingPageMenu" style={style.title}>
          <h1 className="subtitle is-4">What would you like to do?</h1>
          <Button text="Create an Account" onClick={props.openCreateAccountModal} />
          <Button text="Log in" onClick={props.openLoginModal} />
          <Button text="Continue as Guest" onClick={() => props.history.push('/search')} />
        </div>
      </Box>
    </div>
  );
}

export default searchView;