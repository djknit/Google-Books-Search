import React, { Component } from 'react';
import Hero from '../../components/hero';
import SavedBooks from '../../components/saved-books';
import api from '../../utilities/api';

class publicListView extends Component {
  constructor(props) {
    super(props);
    this.updateList = this.updateList.bind(this);
    this.getList = this.getList.bind(this);
    this.state = {
      list: null,
      errorMessage: null,
      noUser: !this.props.user
    };
  }

  updateList(newList) {
    this.setState({
      list: newList
    });
  }

  getList() {
    api.saved.publicList.getList()
      .then(res => {
        console.log(res)
        if (res.data.books) this.setState({ list: res.data.books.reverse() });
      })
      .catch(err => {
        let errorMessage = 'There was an error getting the list from the server. ' +
          (err.response && err.response.data && err.response.data.message) || '';
        this.setState({ errorMessage });
      });
  }

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate() {
    if (this.props.user && this.state.noUser) {
      this.getList();
      this.setState({ noUser: false });
    }
  }

  render() {
    const {
      openSaveBookModal,
      user,
      openLoginModal,
      openCreateAccountModal
    } = this.props;

    return(
      <div>
        <Hero pageName="Saved Titles" />
        <SavedBooks
          list={this.state.list}
          openSaveBookModal={openSaveBookModal}
          isPublicList
          errorMessage={this.state.errorMessage}
          user={user}
          openLoginModal={openLoginModal}
          openCreateAccountModal={openCreateAccountModal}
          updateList={this.updateList}
        />
      </div>
    );
  }
}

export default publicListView;