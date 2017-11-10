import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// Import Assets
import bg from '../header-bg.png';

const Component = styled.footer`
  text-align: center;
  padding: 56px 0;
  background: ${props => props.theme.mainLight} url(${bg}) center;
  background-size: cover;
`;

const Text = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #FFF;

  a {
    color: #FFF;
    text-decoration: none;
    font-weight: 700;
  }
`;

const Footer = () => (
  <Component>
    <Text>&copy; 2016 &middot; Hashnode &middot; LinearBytes Inc.</Text>
    <Text>
      <FormattedMessage id="twitterMessage" />
      :
      <a href="https://twitter.com/@mern_io" target="_Blank" rel="noopener noreferrer">
        @mern_io
      </a>
    </Text>
  </Component>
);

export default Footer;
