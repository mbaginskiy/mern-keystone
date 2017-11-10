import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import 'jest-styled-components';
import Header from '../../components/Header';
import { intl } from '../../../../util/react-intl-test-helper';

const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };

test('renders the header properly', () => {
  const wrapper = shallow(
    <Header switchLanguage={() => {}} intl={intlProp} toggleAddPost={() => {}} />,
    {
      context: {
        intl,
      },
    },
  );

  expect(wrapper.find('Header__Title').length).toBe(1);
  expect(wrapper.find('Header__Title').containsMatchingElement(<FormattedMessage id="siteTitle" />)).toBe(true);
});
