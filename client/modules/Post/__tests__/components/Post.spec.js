import React from 'react';
import 'jest-styled-components';
import Post from '../../components/Post';
import { shallowWithIntl } from '../../../../util/react-intl-test-helper';

const post = {
  author: 'Admin User',
  title: 'Test Title 1',
  slug: 'test-title-1',
  content: {
    brief: 'test-brief',
    extended: 'test-extended',
  },
  id: '1',
};

const props = {
  post,
  type: 'brief',
  onDelete: () => {},
};

test('matches snapshot', () => {
  const wrapper = shallowWithIntl(
    <Post {...props} />,
  );

  expect(wrapper).toMatchSnapshot();
});

test('renders title and author properly', () => {
  const wrapper = shallowWithIntl(
    <Post {...props} />,
  );

  expect(wrapper.find('Post__Title').find('Link').prop('children'))
    .toBe(post.title);
  expect(wrapper.find('Post__AuthorName').prop('children'))
    .toEqual(expect.stringContaining(post.author));
});

test('renders extended content depending on type properly', () => {
  const wrapper = shallowWithIntl(
    <Post {...props} type="extended" />,
  );
  expect(wrapper.find('Post__Content').prop('children'))
    .toBe(post.content.extended);
});

test('renders brief content depending on type properly', () => {
  const wrapper = shallowWithIntl(
    <Post {...props} type="brief" />,
  );
  expect(wrapper.find('Post__Content').prop('children'))
    .toBe(post.content.brief);
});

test('calls onDelete', () => {
  const onDelete = jest.fn();
  const wrapper = shallowWithIntl(
    <Post {...props} onDelete={onDelete} />,
  );

  wrapper.find('Post__Actions a').first().simulate('click');
  expect(onDelete.mock.calls.length).toBe(1);
});
