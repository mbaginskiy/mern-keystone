/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
// import { Router, browserHistory } from 'react-router';

import { Switch, Route } from 'react-router-dom';

import IntlWrapper from './modules/Intl/IntlWrapper';
import AppContainer from './modules/App/App';

// Import Routes
import routes from './routes';

/* eslint-disable no-unused-expressions */
injectGlobal`
  *{
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
  }

  ::-webkit-input-placeholder {
    color:#aaa;
    font-weight: 300;
  }
  ::-moz-placeholder {
    color:#aaa;
    font-weight: 300;
  }
  :-ms-input-placeholder {
    color:#aaa;
    font-weight: 300;
  }
  input:-moz-placeholder {
    color:#aaa;
    font-weight: 300;
  }

  body {
    background: #FFF;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
`;
/* eslint-enable no-unused-expressions */

export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <AppContainer>
          <Switch>
            {routes.map(route => (
              <Route {...route} key={route.path} />
            ))}
          </Switch>
        </AppContainer>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
