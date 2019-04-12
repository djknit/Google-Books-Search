import React, { Component } from 'react';
import './style.css';
import api from '../../../utilities/api';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.toggleComments = this.toggleComments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.commentsSection = React.createRef();
    this.state = {
      isExpanded: null,
      newComment: '',
      isLoading: false,
      height: null
    }
  }

  toggleComments() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  handleChange(event) {
    this.setState({
      newComment: event.target.value
    });
  }

  postComment(event) {
    event.preventDefault();
    console.log(this.state.newComment)
    api.saved.publicList.postComment(this.props.listItemId, this.state.newComment)
      .then(res => console.log(res))
      .catch()
  }

  deleteComment(commentAndListItemIds) {
    console.log(commentAndListItemIds);
  }

  componentDidMount() {
    console.log(this.props.comments)
    //get height
    // source: https://stackoverflow.com/questions/35153599/reactjs-get-height-of-an-element
    const height = this.commentsSection.current.clientHeight;
    console.log(height)
    this.setState({ height });
  }

  componentWillReceiveProps() {
    this.setState({ height: undefined });
  }

  componentDidUpdate() {
    const height = this.commentsSection.current.clientHeight;
    console.log(height)
    if (height !== this.state.height && height !== 0) this.setState({ height });
  }

  render() {
    return (
      <>
        <button onClick={this.toggleComments} className="comment-toggle button is-primary">
          <span
            className={
              (this.state.isExpanded === true && 'fade-out') ||
              (this.state.isExpanded === false && 'fade-in') ||
              ''
            }
          >
            Show comments&nbsp;
          </span>
          <span
            className={
              (this.state.isExpanded === false && 'hide fade-out') ||
              (this.state.isExpanded === true && 'hide fade-in') ||
              'hide'
            }
          >
            Hide comments&nbsp;
          </span>
          <i
            className={`fas fa-chevron-down${
              (this.state.isExpanded === true && ' flip-up') ||
              (this.state.isExpanded === false && ' flip-down') ||
              ' '
            }`}
          />
        </button>
        <div
          className={`comments-section${
            (this.state.isExpanded === true && ' open') ||
            (this.state.isExpanded === false && ' closed') ||
            ' '
          }`}
          ref={this.commentsSection}
          style={{
            height: this.state.height || 'auto',
            position: this.state.isExpanded === null ? 'absolute' : 'static',
            opacity: this.state.isExpanded === null ? 0 : 1,
          }}
        >
          <hr className="divider" />
          {this.props.comments.length ?
            this.props.comments.map(comment => (
              <div className="comment" id={comment._id} key={comment._id}>
                <p className="time">{comment.time}</p>
                <p>
                  <span className="author">{comment.user}:&nbsp;</span>
                  {comment.body}
                </p>
              </div>
            ))
            :
            <div className="content">
              <p className="no-comments">There are no comments for this book yet.</p>
            </div>
          }
          <hr className="divider" />
          {this.props.user ?
            <form className="new-comment">
              <textarea
                className="textarea has-fixed-size"
                placeholder="Share your thoughts..."
                rows="2"
                value={this.state.newComment}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="button is-primary"
                disabled={this.state.isLoading}
                onClick={this.postComment}
              >
                Submit
              </button>
            </form>
            :
            <div className="content">
              <p className="must-login">
                You must <span className="text-link" onClick={this.props.openLoginModal}>sign in
                </span> or <span className="text-link" onClick={this.props.openCreateAccountModal}>
                create an account</span> to write a comment.
              </p>
            </div>
          }
        </div>
      </>
    );
  }
}

export default CommentsSection;