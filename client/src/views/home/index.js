import React from 'react';
import './style.css';
import Hero from '../../components/hero';
import Box from '../../components/box';
import Button from '../../components/landing-button';

export default ({
  openCreateAccountModal,
  openLoginModal,
  history
}) => {

  const style = {
    box: {
      padding: '50px 0'
    }
  }

  return(
    <div>
      <Hero pageName="Welcome to David's Google Books Searcher" />
      <Box style={style.box} mainContainer>
        <div className="landing-page-menu">
          <h1 className="subtitle is-4">What would you like to do?</h1>
          <Button text="Create an Account" onClick={openCreateAccountModal} />
          <Button text="Log in" onClick={openLoginModal} />
          <Button text="Continue as Guest" onClick={() => history.push('/search')} />
        </div>
      </Box>
    </div>
  );
}