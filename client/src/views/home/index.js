import React from 'react';
import  { Redirect } from 'react-router-dom';
import './style.css';
import Hero from '../../components/hero';
import Box from '../../components/box';
import Button from '../../components/landing-button';

export default ({
  openCreateAccountModal,
  openLoginModal,
  history,
  user
}) => {

  const style = {
    box: {
      padding: '50px 0'
    }
  }
  
  // source: https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router
  return user ?
    (
      <Redirect to='/search' />
    ) :
    (
      <div>
        <Hero pageName="Welcome to David's Google Books Searcher" />
        <Box style={style.box} mainContainer>
          <div className="landing-page-menu">
            <h1 className="subtitle is-4">What would you like to do?</h1>
            <Button
              text="Create an Account"
              onClick={openCreateAccountModal}
              tabIndex={1}
            />
            <Button
              text="Log in"
              onClick={openLoginModal}
              tabIndex={1}
            />
            <Button
              text="Continue as Guest"
              onClick={() => history.push('/search')}
              tabIndex={1}
            />
          </div>
        </Box>
      </div>
    );
}