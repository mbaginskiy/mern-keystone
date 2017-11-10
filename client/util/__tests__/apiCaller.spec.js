import nock from 'nock';
import callApi, { API_URL } from '../apiCaller';

test('method defaults to GET', () => {
  const reply = { test: 'test' };
  nock(API_URL)
    .get('/test')
    .reply(200, reply);
  return callApi('test').then((response) => {
    expect(response).toEqual(reply);
  });
});

test('sends the body', () => {
  const body = { id: 'test' };
  const reply = { test: 'test' };
  nock(API_URL)
    .post('/test', body)
    .reply(200, reply);
  return callApi('test', 'post', body).then((response) => {
    expect(response).toEqual(reply);
  });
});

test('returns the error', () => {
  const reply = { message: 'Error' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  return callApi('send_error').then((error) => {
    expect(error).toEqual(reply);
  });
});
