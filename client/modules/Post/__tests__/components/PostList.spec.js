import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import PostList from '../../components/PostList';

const posts = [
  {
    author: 'Admin User',
    title: 'Test Title 1',
    slug: 'test-title-1',
    content: {
      brief: 'test',
      extended: 'test',
    },
    id: '1',
  },
  {
    author: 'Admin User',
    title: 'Test Title 2',
    slug: 'test-title-2',
    content: {
      brief: 'test',
      extended: 'test',
    },
    id: '2',
  },
];

test('renders the list', () => {
  const wrapper = shallow(
    <PostList
      posts={posts}
      handleShowPost={() => {}}
      handleDeletePost={() => {}}
    />,
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Post').length).toBe(2);
});
