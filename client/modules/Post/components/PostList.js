import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post._id}
            onDelete={() => props.handleDeletePost(post._id)}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      brief: PropTypes.string.isRequired,
      extended: PropTypes.string.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
