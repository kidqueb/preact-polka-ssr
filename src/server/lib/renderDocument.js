import devalue from 'devalue';
import renderHead from './renderHead';

/*
 * The main document we render our app into.
 * [TODO] - setup `preact-helmet` or something similar
 */
export default ({ app, assets, initialProps, initialState, params, path }) => `
  <!doctype html>
  <html lang="en">
  ${renderHead({ assets })}
  <body>
    ${app}

    <script id="__SSR_DATA__">
      window.__SSR_DATA__ = ${devalue({ initialProps, initialState, params, path })}
    </script>

    ${assets['vendor.js'] && `<script src=${assets['vendor.js']} defer></script>`}
    <script src=${assets['app.js']} defer></script>
  </body>
  </html>
`;
// <script src=${assets['vendor.js']}></script>