import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import Post from './Post';

const PostList = ({ posts, handleDeletePost }) => (
  <div className="listView">
    {
      posts.map(post => (
        <Post
          post={post}
          key={post.id}
          type="brief"
          onDelete={() => handleDeletePost(post.id)}
        />
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      brief: PropTypes.string.isRequired,
      extended: PropTypes.string.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
