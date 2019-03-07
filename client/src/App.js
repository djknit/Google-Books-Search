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
import SaveBookModal from './components/modals/save-book';
import api from './utilities/api';

class App extends Component {
  constructor(props) {
    // info about super(): http://cheng.logdown.com/posts/2016/03/26/683329
    super(props);
    this.openCreateAccountModal = this.openCreateAccountModal.bind(this);
    this.closeCreateAccountModal = this.closeCreateAccountModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.showLoggedIn = this.showLoggedIn.bind(this);
    this.showLoggedOut = this.showLoggedOut.bind(this);
    this.openSaveBookModal = this.openSaveBookModal.bind(this);
    this.closeSaveBookModal = this.closeSaveBookModal.bind(this);
    this.state = {
      isLoggedIn: false,
      user: undefined,
      bookToSave: undefined,
      isSavingToPublic: false,
      isCreateAccountModalActive: false,
      isLoginModalActive: false,
      isSaveBookModalActive: false
    };
  }

  openCreateAccountModal() {
    this.setState({ isCreateAccountModalActive: true });
  }
  
  closeCreateAccountModal() {
    this.setState({ isCreateAccountModalActive: false });
  }

  openLoginModal() {
    this.setState({ isLoginModalActive: true });
  }

  closeLoginModal() {
    this.setState({ isLoginModalActive: false });
  }

  checkAuthentication() {
    api.auth.test()
      .then(res => res.data.success ?
        this.showLoggedIn(res.data.user) :
        this.showLoggedOut()
      )
      .catch(this.showLoggedOut);
  }

  logUserIn(user) {
    this.setState({
      isLoggedIn: true,
      user
    });
    console.log(this.state)
  }

  logUserOut() {
    api.auth.logout()
      .then(this.showLoggedOut)
      .catch(err => {
        this.checkAuthentication()
      });
  }

  showLoggedIn(user) {
    this.setState({
      isLoggedIn: true,
      user
    });
  }

  showLoggedOut() {
    this.setState({
      isLoggedIn: false,
      user: undefined
    });
  }

  openSaveBookModal(book, isPublic) {
    console.log('\n\n')
    console.log(isPublic)
    console.log('-------------------------')
    console.log(book + '\n\n')
    this.setState({
      bookToSave: book,
      isSavingToPublic: isPublic,
      isSaveBookModalActive: true
    });
    console.log(this.state)
  }

  closeSaveBookModal() {
    this.setState({
      isSaveBookModalActive: false
    });
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  render() { 
    console.log(this.state)
    return (
      <Router>
        <div>
          <Navbar
            openCreateAccountModal={this.openCreateAccountModal}
            openLoginModal={this.openLoginModal}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            logOut={this.logUserOut}
          />
          <Switch>
             {/* source: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
            <Route exact path="/" render={props => <LandingPage {...props} openCreateAccountModal={this.openCreateAccountModal} openLoginModal={this.openLoginModal} />} />
            <Route exact path="/search" render={props => <SearchView {...props} isLoggedIn={this.state.isLoggedIn} openSaveBookModal={this.openSaveBookModal} openCreateAccountModal={this.openCreateAccountModal} openLoginModal={this.openLoginModal} />} />
            <Route exact path="/saved" render={props => <SavedView {...props} isLoggedIn={this.state.isLoggedIn} />} />
            <Route component={NotFoundView} />
          </Switch>
          <CreateAccountModal closeModal={this.closeCreateAccountModal} isActive={this.state.isCreateAccountModalActive} logUserIn={this.logUserIn} className={this.openCreateAccountModal} />
          <LoginModal closeModal={this.closeLoginModal} isActive={this.state.isLoginModalActive} logUserIn={this.logUserIn} />
          <SaveBookModal closeModal={this.closeSaveBookModal} isActive={this.state.isSaveBookModalActive} book={this.state.bookToSave} isPublic={this.state.isSavingToPublic} />
        </div>
      </Router>
    );
  }
}

export default App;