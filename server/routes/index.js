/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

import keystone from 'keystone';
import compression from 'compression';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

import middleware from './middleware';
import config from '../../webpack.config.dev';
// Import required modules../
import configureStore from '../../client/store';
import App from '../../client/App';
import routes from '../../client/routes';
import promiseSequence from '../util/promiseSequence';

// Import API Route Controllers
import * as posts from './api/posts';

// Combile API Route Controllers
const api = {
  posts,
};

// Render Initial HTML
const renderFullPage = (initialView, initialStyles, initialState) => {
  const head = Helmet.rewind();
  const { webpackAssets, webpackChunkAssets } = process.env;

  // Import Manifests
  const assetsManifest = webpackAssets && JSON.parse(webpackAssets);
  const chunkManifest = webpackChunkAssets && JSON.parse(webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        ${initialStyles}
      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? initialView : `<div>${initialView}</div>`}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
    `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Setup Route Bindings
module.exports = (app) => {
  // Run Webpack dev server in development mode
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
  }

  // Apply body Parser and server public assets and routes
  app.use(compression());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

  // Server Side Rendering based on routes matched by React-router.
  app.use((req, res, next) => {
    const promises = [];
    const store = configureStore();
    const context = {};
    const sheet = new ServerStyleSheet();
    routes.some((route) => {
      const match = matchPath(req.url, route);
      if (match) {
        promises.push(route.loadData(match));
      }
      return match;
    });

    if (promises.length) {
      return promiseSequence(promises, promise => store.dispatch(promise)
        .then(() => {
          const initialView = renderToString(
            <StaticRouter
              location={req.url}
              context={context}
            >
              <StyleSheetManager sheet={sheet.instance}>
                <App store={store} />
              </StyleSheetManager>
            </StaticRouter>,
          );
          const initialStyles = sheet.getStyleTags();
          res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, initialStyles, store.getState()));
        }));
    }
    return next();
  });

  // API Routes
  app.get('/api/posts/', keystone.middleware.api, api.posts.getPosts);
  app.get('/api/posts/:slug', keystone.middleware.api, api.posts.getPost);
  app.post('/api/posts/', keystone.middleware.api, api.posts.createPost);
  app.put('/api/posts/:slug', keystone.middleware.api, api.posts.updatePost);
  app.delete('/api/posts/:slug', keystone.middleware.api, api.posts.deletePost);

  // note: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};
