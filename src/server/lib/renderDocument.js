import devalue from 'devalue'
import renderHead from './renderHead'

/*
 * The main document we render our app into.
 * [TODO] - setup `preact-helmet` or something similar
 */
export default ({ app, assets, head, initialProps, initialState, params, path, }) => `
  <html>
  ${renderHead({ assets, head })}
  <body>
    <div id="app">${app}</div>

    <script id="__SSR_DATA__">
      window.__SSR_DATA__ = ${devalue({ initialProps, initialState, params, path })}
    </script>

    <script src=${assets['vendor.js']}></script>
    <script src=${assets['app.js']} defer></script>
  </body>
  </html>
`
