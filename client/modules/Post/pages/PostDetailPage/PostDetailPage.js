import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import renderHTML from 'react-render-html';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

export function PostDetailPage(props) {
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.author}</p>
        <div className={styles['post-desc']}>{renderHTML(props.post.content.extended)}</div>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.slug);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.slug),
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
