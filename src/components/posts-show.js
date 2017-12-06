import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <div>
          <h3>Grabbing post...</h3>
        </div>
      );
    }
    return (
      <div>
        <Link to="/">Back to List</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
