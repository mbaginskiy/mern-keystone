import appReducer, { getShowAddPost } from '../AppReducer';
import { TOGGLE_ADD_POST } from '../AppActions';

test('action for TOGGLE_ADD_POST is working', () => {
  expect(appReducer({ showAddPost: false }, { type: TOGGLE_ADD_POST }))
    .toEqual({ showAddPost: true });
});

test('getShowAddPost selector is working', () => {
  expect(getShowAddPost({ app: { showAddPost: false } }))
    .toEqual(false);
});
