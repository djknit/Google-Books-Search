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
import ResetPasswordView from './views/reset-password';
import VerifyEmailView from './views/verify-email';
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
    this.updateUserList = this.updateUserList.bind(this);
    this.openSaveBookModal = this.openSaveBookModal.bind(this);
    this.closeSaveBookModal = this.closeSaveBookModal.bind(this);
    this.openPrivacySettingsModal = this.openPrivacySettingsModal.bind(this);
    this.closePrivacySettingsModal = this.closePrivacySettingsModal.bind(this);
    this.openDeleteBookModal = this.openDeleteBookModal.bind(this);
    this.closeDeleteBookModal = this.closeDeleteBookModal.bind(this);
    this.openPasswordResetModal = this.openPasswordResetModal.bind(this);
    this.closePasswordResetModal = this.closePasswordResetModal.bind(this);
    this.openEditEmailModal = this.openEditEmailModal.bind(this);
    this.closeEditEmailModal = this.closeEditEmailModal.bind(this);
    this.openEditUsernameModal = this.openEditUsernameModal.bind(this);
    this.closeEditUsernameModal = this.closeEditUsernameModal.bind(this);
    this.openEditPasswordModal = this.openEditPasswordModal.bind(this);
    this.closeEditPasswordModal = this.closeEditPasswordModal.bind(this);
    this.footerHeight = 50;
    this.state = {
      user: null,
      bookToSave: null,
      isCreateAccountModalActive: false,
      isLoginModalActive: false,
      isSaveBookModalActive: false,
      isPrivacySettingsModalActive: false,
      isDeleteBookModalActive: false,
      isPasswordResetModalActive: false,
      isEditEmailModalActive: false,
      isEditUsernameModalActive: false,
      isEditPasswordModalActive: false,
      bookToDelete: null,
      userBooksList: null
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

  openPasswordResetModal() {
    this.setState({ isPasswordResetModalActive: true });
  }

  closePasswordResetModal() {
    this.setState({ isPasswordResetModalActive: false });
  }

  checkAuthentication() {
    api.auth.test()
      .then(res => {
        if (res && res.data && res.data.success) {
          this.setState({ user: res.data.user });
        }
        else this.setState({ user: null })
      })
      .catch(err => {
        console.log(err);
        this.setState({ user: null });
      });
  }

  setUser(user) {
    this.setState({ user });
  }

  logUserOut() {
    api.auth.logout()
      .then(res => this.setState({ user: null }))
      .catch(err => this.setState({ user: null }));
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

  openDeleteBookModal(listItemArrayIndex) {
    const bookToDelete = this.state.userBooksList[listItemArrayIndex];
    this.setState({
      bookToDelete,
      isDeleteBookModalActive: true
    });
  }

  closeDeleteBookModal() {
    this.setState({
      isDeleteBookModalActive: false,
      bookToDelete: null
    })
  }

  updateUserList(newList) {
    this.setState({
      userBooksList: newList 
    });
  }

  openEditEmailModal() {
    this.setState({
      isEditEmailModalActive: true
    });
  }

  closeEditEmailModal() {
    this.setState({
      isEditEmailModalActive: false
    });
  }

  openEditUsernameModal() {
    this.setState({
      isEditUsernameModalActive: true
    });
  }
  
  closeEditUsernameModal() {
    this.setState({
      isEditUsernameModalActive: false
    });
  }
  
  openEditPasswordModal() {
    this.setState({
      isEditPasswordModalActive: true
    });
  }
  
  closeEditPasswordModal() {
    this.setState({
      isEditPasswordModalActive: false
    });
  }

  componentDidMount() {
    console.log('checking auth (App: componentDidMount)')
    this.checkAuthentication();
  }

  render() { 
    const {
      isCreateAccountModalActive,
      isLoginModalActive,
      isSaveBookModalActive,
      isPrivacySettingsModalActive,
      isDeleteBookModalActive,
      isPasswordResetModalActive,
      isEditEmailModalActive,
      isEditUsernameModalActive,
      isEditPasswordModalActive
    } = this.state;

    const areAnyModalsOpen = isCreateAccountModalActive || isLoginModalActive || isSaveBookModalActive || isPrivacySettingsModalActive ||
      isDeleteBookModalActive || isPasswordResetModalActive || isEditEmailModalActive || isEditUsernameModalActive || isEditPasswordModalActive;

    // console.log(this.state)
    // console.log(document.location.pathname)
    return (
      <Router>
        <div id="whole-page">
          <div id="whole-page-except-footer" style={{ minHeight: `calc(100vh - ${this.footerHeight}px)` }}>
            <Navbar
              user={this.state.user}
              logOut={this.logUserOut}
              openCreateAccountModal={this.openCreateAccountModal}
              openLoginModal={this.openLoginModal}
              openPrivacySettingsModal={this.openPrivacySettingsModal}
              openEditUsernameModal={this.openEditUsernameModal}
              openEditEmailModal={this.openEditEmailModal}
              openEditPasswordModal={this.openEditPasswordModal}
              areAnyModalsOpen={areAnyModalsOpen}
            />
            <Switch>
              {/* source: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
              <Route
                exact path="/"
                render={props => <LandingPage
                  {...props}
                  openCreateAccountModal={this.openCreateAccountModal}
                  openLoginModal={this.openLoginModal}
                  user={this.state.user}
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
                  list={this.state.userBooksList}
                  updateList={this.updateUserList}
                  openSaveBookModal={this.openSaveBookModal}
                  openDeleteBookModal={this.openDeleteBookModal}
                />}
              />
              <Route
                path='/reset-password/:token'
                render={props => <ResetPasswordView
                  {...props}
                  setUser={this.setUser}
                />}
              />
              <Route
                path='/verify-email/:token'
                render={props => <VerifyEmailView
                  {...props}
                  footerHeight={this.footerHeight}
                  setUser={this.setUser}
                />}
              />
              <Route
                render={props => <NotFoundView
                  {...props}
                  footerHeight={this.footerHeight}
                />}
              />
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
            isDeleteBookModalActive={this.state.isDeleteBookModalActive}
            closeDeleteBookModal={this.closeDeleteBookModal}
            bookToDelete={this.state.bookToDelete}
            updateUserList={this.updateUserList}
            isPasswordResetModalActive={this.state.isPasswordResetModalActive}
            openPasswordResetModal={this.openPasswordResetModal}
            closePasswordResetModal={this.closePasswordResetModal}
            isEditEmailModalActive={this.state.isEditEmailModalActive}
            isEditUsernameModalActive={this.state.isEditUsernameModalActive}
            isEditPasswordModalActive={this.state.isEditPasswordModalActive}
            closeEditEmailModal={this.closeEditEmailModal}
            closeEditUsernameModal={this.closeEditUsernameModal}
            closeEditPasswordModal={this.closeEditPasswordModal}
          />
        </div>
      </Router>
    );
  }
}

export default App;