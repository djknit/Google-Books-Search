import React, { Component } from 'react';
import Hero from '../../components/hero';
import SavedBooks from '../../components/saved-books';
import api from '../../utilities/api';

class publicListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      errorMessage: null
    };
  }

  componentDidMount() {
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

  render() {
    return(
      <div>
        <Hero pageName="Saved Titles" />
        <SavedBooks
          list={this.state.list}
          openSaveBookModal={this.props.openSaveBookModal}
          isPublicList
          errorMessage={this.state.errorMessage}
          user={this.props.user}
          openLoginModal={this.props.openLoginModal}
          openCreateAccountModal={this.props.openCreateAccountModal}
        />
      </div>
    );
  }
}

export default publicListView;