import postReducer, { getPost, getPosts } from '../PostReducer';
import { ADD_POST, ADD_POSTS, DELETE_POST } from '../PostActions';

test('PostReducer should return the initial state', () => {
  expect(postReducer({ data: [] }, {})).toEqual({ data: [] });
});

test('PostReducer action for ADD_POST is working', () => {
  expect(
    postReducer(
      { data: [] },
      {
        type: ADD_POST,
        post: {
          id: 'test-id',
          title: 'Test Title',
        },
      },
    ),
  ).toEqual({ data: [
    {
      id: 'test-id',
      title: 'Test Title',
    },
  ] });
});

test('PostReducer action for DELETE_POST is working', () => {
  expect(
    postReducer(
      { data: [
        {
          id: 'test-id',
          title: 'Test Title',
        },
      ] },
      {
        type: DELETE_POST,
        id: 'test-id',
      },
    ),
  ).toEqual({ data: [] });
});

test('PostReducer action for ADD_POSTS is working', () => {
  expect(
    postReducer(
      { data: [] },
      {
        type: ADD_POSTS,
        posts: [
          {
            id: 'test-id-1',
            title: 'Test Title 1',
          },
          {
            id: 'test-id-2',
            title: 'Test Title 2',
          },
        ],
      },
    ),
  ).toEqual({ data: [
    {
      id: 'test-id-1',
      title: 'Test Title 1',
    },
    {
      id: 'test-id-2',
      title: 'Test Title 2',
    },
  ] });
});

test('PostReducer getPosts selector is working', () => {
  expect(
    getPosts({
      posts: { data: [
        {
          id: 'test-id',
          title: 'Test Title',
        },
      ] },
    }),
  ).toEqual([
    {
      id: 'test-id',
      title: 'Test Title',
    },
  ]);
});

test('PostReducer getPost selector is working', () => {
  expect(
    getPost({
      posts: { data: [
        {
          id: 'test-id',
          title: 'Test Title',
          slug: 'test-slug',
        },
      ] },
    },
    'test-slug'),
  ).toEqual({
    id: 'test-id',
    title: 'Test Title',
    slug: 'test-slug',
  });
});
