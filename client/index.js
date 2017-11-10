/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import configureStore from './store';

// Initialize store
// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <Router>
      <App store={store} />
    </Router>
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <Router>
          <NextApp store={store} />
        </Router>
      </AppContainer>,
      mountApp,
    );
  });
}
