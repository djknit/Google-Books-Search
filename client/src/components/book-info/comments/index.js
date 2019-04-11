import React, { Component } from 'react';
import './style.css';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.toggleComments = this.toggleComments.bind(this);
    this.state = {
      isExpanded: null
    }
  }

  toggleComments() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  componentDidMount() {
    console.log(this.props.book)
  }

  render() {
    return (
      <div
        className={`comments-section${
          (this.state.isExpanded === true && ' open') || (this.state.isExpanded === false && ' closed') || ' '
        }`}

      >
        <button onClick={this.toggleComments} className="comment-toggle button is-primary">
          <span>Show comments <i class="fas fa-chevron-down"></i></span>
        </button>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    );
  }
}

export default CommentsSection;