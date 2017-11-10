import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import App from '../App';
import { intl } from '../../../util/react-intl-test-helper';

const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };
const children = <h1>Test</h1>;
const dispatch = jest.fn();
const props = {
  children,
  dispatch,
  intl: intlProp,
};
const store = createMockStore({ intl: intlProp });

test('renders properly', () => {
  const context = {
    store,
  };
  const wrapper = shallow(
    <App {...props} />,
    { context },
  );

  expect(wrapper.dive().find('Header').length)
    .toBe(1);
  expect(wrapper.dive().find('Footer').length)
    .toBe(1);
  expect(wrapper.dive().find('Header').prop('toggleAddPost'))
    .toEqual(wrapper.instance().toggleAddPostSection);
});
