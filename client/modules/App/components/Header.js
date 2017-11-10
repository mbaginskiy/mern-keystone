import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// Import Assets
import headerBg from '../header-bg.png';

const Component = styled.header`
  background: ${props => props.theme.mainLight} url(${headerBg}) center;
  background-size: cover;
  border-bottom: 1px solid ${props => props.theme.mainLight};
`;

const Content = styled.div`
  width: 100%;
  max-width: 980px;
  margin: auto;
  padding: 64px 16px;
  overflow: auto;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 42px;
  float: left;

  & a {
    text-decoration: none;
    color: #FFF;
  }
`;

const LanguageSwitcher = styled.div`
  background: rgba(0, 0, 0, 0.1);
`;

const LanguageList = styled.ul`
  list-style: none;
  max-width: 980px;
  margin: auto;
  text-align: right;
`;

const LanguageListItem = styled.li`
  display: inline-block;
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  color: #fff;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props => (props.selected ? '#fff' : 'transparent')};

  a {
    color: #fff;
    text-decoration: none;
  }

  &:first-child {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Header = (props) => {
  const { intl, switchLanguage } = props;

  const onLanguageListItemClick = (event, lang) => {
    event.preventDefault();
    switchLanguage(lang);
  };

  const languageNodes = intl.enabledLanguages.map(
    lang => (
      <LanguageListItem
        key={lang}
        selected={lang === intl.locale}
      >
        <a href={lang} onClick={event => onLanguageListItemClick(event, lang)}>
          {lang}
        </a>
      </LanguageListItem>
    ),
  );

  return (
    <Component>
      <LanguageSwitcher>
        <LanguageList>
          <LanguageListItem>
            <FormattedMessage id="switchLanguage" />
          </LanguageListItem>
          {languageNodes}
        </LanguageList>
      </LanguageSwitcher>
      <Content>
        <Title>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </Title>
      </Content>
    </Component>
  );
};

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    enabledLanguages: PropTypes.array.isRequired,
    messages: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Header;
