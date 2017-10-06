import keystone from 'keystone';
import path from 'path';

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
import './envConfigInit';

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
const keystoneConfig = {
  name: 'mern-keystone-boilerplate',
  brand: 'mern-keystone-boilerplate',
  session: true,
  auth: true,
  'auto update': true,
  'user model': 'User',
  'module root': path.resolve(__dirname),
};

if (process.env.NODE_ENV === 'production') {
  keystoneConfig.static = path.resolve(__dirname, '../dist/client');
}

keystone.init(keystoneConfig);
