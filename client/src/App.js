import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './views/home';
import SearchView from './views/search';
import PublicListView from './views/public-list';
import UserListView from './views/user-list';
import NotFoundView from './views/not-found';
import Modals from './components/modals';
import MyFooter from './components/footer';
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
    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.openSaveBookModal = this.openSaveBookModal.bind(this);
    this.closeSaveBookModal = this.closeSaveBookModal.bind(this);
    this.openPrivacySettingsModal = this.openPrivacySettingsModal.bind(this);
    this.closePrivacySettingsModal = this.closePrivacySettingsModal.bind(this);
    this.footerHeight = 50;
    this.state = {
      user: null,
      bookToSave: null,
      isCreateAccountModalActive: false,
      isLoginModalActive: false,
      isSaveBookModalActive: false,
      isPrivacySettingsModalActive: false,
      publicBooksList: []
    };
  }

  openCreateAccountModal() {
    this.setState({
      isCreateAccountModalActive: true,
      isLoginModalActive: false,
      isSaveBookModalActive: false
    });
  }
  
  closeCreateAccountModal() {
    this.setState({ isCreateAccountModalActive: false });
  }

  openLoginModal() {
    this.setState({
      isCreateAccountModalActive: false,
      isLoginModalActive: true,
      isSaveBookModalActive: false
    });
  }

  closeLoginModal() {
    this.setState({ isLoginModalActive: false });
  }

  checkAuthentication() {
    api.auth.test()
      .then(res => res.data.success ?
        this.setState({ user: res.data.user }) :
        this.setState({ user: null })
      )
      .catch(err => console.log(err));
  }

  setUser(user) {
    this.setState({ user });
  }

  logUserOut() {
    api.auth.logout()
      .then(res => this.setState({ user: null }))
      .catch(err => {
        console.log(err);
        this.checkAuthentication();
      });
  }

  openSaveBookModal(book) {
    console.log(book)
    this.setState({
      bookToSave: book,
      isSaveBookModalActive: true
    });
  }

  closeSaveBookModal() {
    this.setState({
      isSaveBookModalActive: false
    });
  }
  
  openPrivacySettingsModal() {
    this.setState({
      isPrivacySettingsModalActive: true
    });
  }

  closePrivacySettingsModal() {
    this.setState({
      isPrivacySettingsModalActive: false
    });
  }

  componentDidMount() {
    console.log('checking auth (App: componentDidMount)')
    this.checkAuthentication();
  }

  render() { 
    // console.log(this.state)
    // console.log(document.location.pathname)
    return (
      <Router>
        <div id="whole-page">
          <div id="whole-page-except-footer" style={{ minHeight: `calc(100vh - ${this.footerHeight}px)` }}>
            <Navbar
              openCreateAccountModal={this.openCreateAccountModal}
              openLoginModal={this.openLoginModal}
              openPrivacySettingsModal={this.openPrivacySettingsModal}
              user={this.state.user}
              logOut={this.logUserOut}
            />
            <Switch>
              {/* source: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
              <Route
                exact path="/"
                render={props => <LandingPage
                  {...props}
                  openCreateAccountModal={this.openCreateAccountModal}
                  openLoginModal={this.openLoginModal}
                />}
              />
              <Route
                exact path="/search"
                render={props => <SearchView
                  {...props}
                  user={this.state.user}
                  openSaveBookModal={this.openSaveBookModal}
                />}
              />
              <Route
                exact path="/public-list"
                render={props => <PublicListView
                  {...props}
                  user={this.state.user}
                  openSaveBookModal={this.openSaveBookModal}
                  openCreateAccountModal={this.openCreateAccountModal}
                  openLoginModal={this.openLoginModal}
                />}
              />
              <Route
                exact path="/my-list"
                render={props => <UserListView
                  {...props}
                  user={this.state.user}
                  openSaveBookModal={this.openSaveBookModal}
                />}
              />
              <Route component={NotFoundView} />
            </Switch>
          </div>
          <MyFooter height={this.footerHeight} />
          <Modals
            isCreateAccountModalActive={this.state.isCreateAccountModalActive}
            closeCreateAccountModal={this.closeCreateAccountModal}
            setUser={this.setUser}
            isLoginModalActive={this.state.isLoginModalActive}
            closeLoginModal={this.closeLoginModal}
            isSaveBookModalActive={this.state.isSaveBookModalActive}
            closeSaveBookModal={this.closeSaveBookModal}
            openLoginModal={this.openLoginModal}
            openCreateAccountModal={this.openCreateAccountModal}
            bookToSave={this.state.bookToSave}
            user={this.state.user}
            closePrivacySettingsModal={this.closePrivacySettingsModal}
            isPrivacySettingsModalActive={this.state.isPrivacySettingsModalActive}
            openPrivacySettingsModal={this.openPrivacySettingsModal}
          />
        </div>
      </Router>
    );
  }
}

export default App;