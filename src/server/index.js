import { h } from 'preact';
import fs from 'fs';
import polka from 'polka';
import spdy from 'spdy';
import sirv from 'sirv';
import compression from 'compression';
import renderToString from 'preact-render-to-string';
import { Provider } from 'unistore/preact';

import routes from '~/routes';
import createStore from '../shared/store';
import asyncPrep from './lib/asyncPrep';
import renderDocument from './lib/renderDocument';
import getMatchingRoute from '../shared/lib/getMatchingRoute';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Create Polka handler, register middleware & routes
 */
const server = polka()
  .use(compression())
  .use(sirv('dist'))
  .get('*', (req, res) => {
    const assets = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'));
    const { route, params } = getMatchingRoute(routes, req.url);
    const store = createStore();
    const initialState = store.getState();

    // Wait for `loadInitialProps` and `ensureReady` to resolve,
    // then render <App /> with the `initialProps` and <Component />
    asyncPrep({ req, res, route, params, store }).then(({ Component, initialProps }) => {
      const head = Component.setHead !== undefined ? Component.setHead(params) : {};

      const App = () => (
        <Provider store={store}>
          <Component {...initialProps} />
        </Provider>
      );

      // Render our app, then the entire document
      const app = renderToString(<App />);
      const html = renderDocument({
        app,
        assets,
        params,
        head,
        initialProps,
        initialState,
        path: route.path
      });

      res.end(html);
    }
  );
});

/**
 * Start the server
 */
isDev ? runDev() : runProd();

function runDev() {
  server.listen(3000, () => {
    console.log(`Running @ http://localhost:3000`);
  });
}

function runProd() {
  server.listen(3000, () => {
    console.log(`Running @ http://localhost:3000`);
  });
}
