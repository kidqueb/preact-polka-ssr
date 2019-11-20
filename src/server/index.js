import { h } from 'preact';
import fs from 'fs';
import polka from 'polka';
import sirv from 'sirv';
import compression from 'compression';
import renderToString from 'preact-render-to-string';
import { Router } from "wouter-preact"
import useStaticLocation from "wouter-preact/static-location"

import asyncPrep from './lib/asyncPrep';
import renderDocument from './lib/renderDocument';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Create Polka handler, register middleware & routes
 */
const server = polka()
  .use(compression())
  .use(sirv('dist'))
  .get('*', (req, res, next) => {
    const assets = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'));

    // Wait for `loadInitialProps` and `ensureReady` to resolve,
    // then render <App /> with the `initialProps` and <Component />
    asyncPrep(req).then((asyncPayload) => {
      if (!asyncPayload) return next()

      const { CurrentRoute, params, initialProps } = asyncPayload

      const App = () => (
        <Router hook={useStaticLocation(req.url)}>
          <CurrentRoute {...initialProps} />
        </Router>
      );

      // Render our app
      const app = renderToString(<App />);

      // Render our html template
      const html = renderDocument({
        app,
        assets,
        params,
        initialProps
      });

      res.end(html);
    }
  ).catch(e => console.log(e));
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
