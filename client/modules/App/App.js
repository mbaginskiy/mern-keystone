import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

// Import Components
import DevTools from './components/DevTools';
import Header from './components/Header';
import Footer from './components/Footer';

// Import Actions
import { switchLanguage } from '../../modules/Intl/IntlActions';

const theme = {
  main: '#616161',
  mainLight: '#888',
  mainDark: '#555',
};

const Container = styled.div`
  max-width: 980px;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <ThemeProvider theme={theme}>
          <div>
            <Helmet
              title="MERN Starter - Blog App"
              titleTemplate="%s - Blog App"
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />
            <Header
              switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
              intl={this.props.intl}
              toggleAddPost={this.toggleAddPostSection}
            />
            <Container>
              {this.props.children}
            </Container>
            <Footer />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    enabledLanguages: PropTypes.array.isRequired,
    messages: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
