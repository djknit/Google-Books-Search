import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './views/home';
import SearchView from './views/search';
import SavedView from './views/saved';
import NotFoundView from './views/not-found';
import CreateAccountModal from './components/modals/create-account';
import LoginModal from './components/modals/login';

class App extends Component {
  openCreateAccountModal() {
    document.getElementById('createAccountModal').classList.add('is-active');
  }

  openLoginModal() {
    document.getElementById('loginModal').classList.add('is-active');
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar openCreateAccountModal={this.openCreateAccountModal} openLoginModal={this.openLoginModal} />
          <Switch>
            {/* source: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
            <Route exact path="/" render={props => <LandingPage {...props} openCreateAccountModal={this.openCreateAccountModal} openLoginModal={this.openLoginModal} />} />
            <Route exact path="/search" component={SearchView} />
            <Route exact path="/saved" component={SavedView} />
            <Route component={NotFoundView} />
          </Switch>
          <CreateAccountModal />
          <LoginModal />
        </div>
      </Router>
    );
  }
}

export default App;
