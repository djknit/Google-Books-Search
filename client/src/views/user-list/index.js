import React, { Component } from 'react';
import Hero from '../../components/hero';
import SavedBooks from '../../components/saved-books';
import api from '../../utilities/api';

class publicListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      errorMessage: null,
      hasError: false
    };
  }

  componentDidMount() {
    api.saved.userList.getList()
      .then(res => {
        console.log(res)
        if (res.data.books) this.setState({ list: res.data.books.reverse() });
      })
      .catch(err => {
        // if (err.response.status === 401) return this.props.history.push('/');
        this.setState({
          hasError: true,
          errorMessage: (err.response.data && err.response.data.message) || 'Unknown error.'
        });
      });
  }

  render() {
    return(
      <div>
        <Hero pageName="Saved Titles" />
        <SavedBooks
          list={this.state.list}
          openSaveBookModal={this.props.openSaveBookModal}
          errorMessage={this.state.errorMessage}
          hasError={this.state.hasError}
        />
      </div>
    );
  }
}

export default publicListView;