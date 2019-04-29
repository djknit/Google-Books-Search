import React, { Component } from 'react';
import Hero from '../../components/hero';
import SavedBooks from '../../components/saved-books';
import api from '../../utilities/api';

class UserListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      hasError: false
    };
  }

  componentDidMount() {
    api.saved.userList.getList()
      .then(res => {
        console.log(res)
        if (res.data.books) this.props.updateList(res.data.books.reverse());
      })
      .catch(err => {
        if (err && err.response && err.response.status === 401) return this.props.history.push('/');
        this.setState({
          hasError: true,
          errorMessage: (err.response.data && err.response.data.message) || 'Unknown error.'
        });
      });
  }

  render() {
    const { list, openSaveBookModal, updateList, openDeleteBookModal } = this.props;

    return(
      <div>
        <Hero pageName="Saved Titles" />
        <SavedBooks
          list={list}
          openSaveBookModal={openSaveBookModal}
          errorMessage={this.state.errorMessage}
          hasError={this.state.hasError}
          updateList={updateList}
          isUserList
          openDeleteBookModal={openDeleteBookModal}
        />
      </div>
    );
  }
}

export default UserListView;