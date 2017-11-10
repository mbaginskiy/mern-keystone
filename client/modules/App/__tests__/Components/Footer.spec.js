import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Footer from '../../components/Footer';

test('renders the footer properly', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Footer__Text').length).toBe(2);
  expect(wrapper.find('Footer__Text').first().props().children).toBe('© 2016 · Hashnode · LinearBytes Inc.');
});
