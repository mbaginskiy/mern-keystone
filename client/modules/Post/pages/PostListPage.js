import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../components/PostList';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../PostActions';
import { toggleAddPost } from '../../App/AppActions';

// Import Selectors
import { getPosts } from '../PostReducer';

class PostListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost(post) {
    this.props.dispatch(deletePostRequest(post));
  }

  handleAddPost(name, title, content) {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  }

  render() {
    return (
      <div>
        <PostList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      brief: PropTypes.string.isRequired,
      extended: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
