import { TOGGLE_ADD_POST, toggleAddPost } from '../AppActions';

test('should return the correct type for toggleAddPost', () => {
  const expectedAction = {
    type: TOGGLE_ADD_POST,
  };
  expect(toggleAddPost()).toEqual(expectedAction);
});
