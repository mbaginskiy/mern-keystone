import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Components
import Post from '../components/Post';

// Import Selectors
import { getPost } from '../PostReducer';

const PostDetailPage = ({ post }) => (
  <div>
    <Helmet title={post.title} />
    <Post
      post={post}
      type="extended"
    />
  </div>
);

function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.match.params.slug),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      brief: PropTypes.string.isRequired,
      extended: PropTypes.string.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
