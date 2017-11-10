import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import renderHTML from 'react-render-html';
import styled from 'styled-components';

const Component = styled.div`
  margin: 20px 0;
  padding: 15px;
  border-radius: 2px;
`;

const Title = styled.h3`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 400;
  color: ${props => props.theme.mainDark};

  & a {
    text-decoration: none;
    color: ${props => props.theme.mainDark};
  }
`;

const AuthorName = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  color: ${props => props.theme.mainLight};
`;

const Content = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${props => props.theme.main};
`;

const Actions = styled.div`

  & a {
    text-decoration: none;
    font-size: 14px;
    font-style: italic;
    color: ${props => props.theme.mainDark};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Post = (props) => {
  const { post: { slug, title, author, content }, type, onDelete } = props;
  return (
    <Component>
      <Title>
        <Link to={`/posts/${slug}`} >
          {title}
        </Link>
      </Title>
      <AuthorName>
        <FormattedMessage id="by" /> {author}
      </AuthorName>
      <Content>
        {renderHTML(type === 'brief' ? content.brief : content.extended)}
      </Content>
      <Actions>
        <a href="#delete" onClick={onDelete}><FormattedMessage id="deletePost" /></a>
      </Actions>
    </Component>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      brief: PropTypes.string.isRequired,
      extended: PropTypes.string.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['brief', 'extended']).isRequired,
  onDelete: PropTypes.func,
};

Post.defaultProps = {
  onDelete: () => {},
};

export default Post;
