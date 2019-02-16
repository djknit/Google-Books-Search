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
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.openCreateAccountModal = this.openCreateAccountModal.bind(this);
    this.closeCreateAccountModal = this.closeCreateAccountModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.state = {
      isLoggedIn: false,
      user: null
    };
  }

  openCreateAccountModal() {
    document.getElementById('createAccountModal').classList.add('is-active');
  }
  
  closeCreateAccountModal() {
    document.getElementById('createAccountModal').classList.remove('is-active');
  }

  openLoginModal() {
    document.getElementById('loginModal').classList.add('is-active');
  }

  closeLoginModal() {
    document.getElementById('loginModal').classList.remove('is-active');
  }

  logUserIn(user) {
    this.setState({
      isLoggedIn: true,
      user
    });
    console.log(this.state)
  }

  logUserOut() {
    this.setState({
      isLoggedIn: false,
      user: null
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            openCreateAccountModal={this.openCreateAccountModal}
            openLoginModal={this.openLoginModal}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
          />
          <h1>{!this.state.isLoggedIn ? 'NOT Logged In' : 'LOGGED IN'}</h1>
          <Switch>
            {/* source: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
            <Route exact path="/" render={props => <LandingPage {...props} openCreateAccountModal={this.openCreateAccountModal} openLoginModal={this.openLoginModal} />} />
            <Route exact path="/search" component={SearchView} />
            <Route exact path="/saved" component={SavedView} />
            <Route component={NotFoundView} />
          </Switch>
          <CreateAccountModal closeModal={this.closeCreateAccountModal} logUserIn={this.logUserIn} />
          <LoginModal closeModal={this.closeLoginModal} logUserIn={this.logUserIn} />
        </div>
      </Router>
    );
  }
}

export default App;
