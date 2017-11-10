import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  ADD_POST,
  DELETE_POST,
  ADD_POSTS,
  addPost,
  deletePost,
  addPosts,
  fetchPosts,
} from '../PostActions';

const post = {
  id: 'test-id',
  title: 'Test Title',
  slug: 'test-slug',
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PostActions sync actions', () => {
  it('should return the correct type for addPost', () => {
    const expectedAction = {
      type: ADD_POST,
      post,
    };
    expect(addPost(post)).toEqual(expectedAction);
  });

  it('should return the correct type for deletePost', () => {
    const expectedAction = {
      type: DELETE_POST,
      id: post.id,
    };
    expect(deletePost(post.id)).toEqual(expectedAction);
  });

  it('should return the correct type for addPosts', () => {
    const expectedAction = {
      type: ADD_POSTS,
      posts: [post],
    };
    expect(addPosts([post])).toEqual(expectedAction);
  });
});

describe('PostActions async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates ADD_POSTS when fetching posts has been done', () => {
    fetchMock.getOnce(`http://localhost:${process.env.PORT}/api/posts`,
      {
        body: { posts: ['test'] },
        headers: { 'content-type': 'application/json' },
      },
    );

    const expectedActions = [
      { type: ADD_POSTS, posts: ['test'] },
    ];
    const store = mockStore({ posts: { data: [] } });

    return store.dispatch(fetchPosts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
