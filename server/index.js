import './envConfigInit';
// eslint-disable-next-line import/first
import keystone from 'keystone';
import './keystoneInit';
import './models';
import routes from './routes';

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', routes);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users',
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
