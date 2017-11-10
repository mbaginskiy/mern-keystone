import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

const IntlWrapper = props => (
  <IntlProvider {...props.intl} >
    {props.children}
  </IntlProvider>
);

IntlWrapper.propTypes = {
  children: PropTypes.element.isRequired,
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

export default connect(mapStateToProps)(IntlWrapper);
