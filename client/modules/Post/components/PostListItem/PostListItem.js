import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import renderHTML from 'react-render-html';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}`} >
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.author}</p>
      <div className={styles['post-desc']}>{renderHTML(props.post.content.brief)}</div>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
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
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
