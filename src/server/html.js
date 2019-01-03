import devalue from 'devalue'

/*
 * The main document we render our app into.
 * TODO: setup `preact-helmet`
 */
export default ({ app, assets, data, initialState, path }) => `
  <html>
  <head>
    <title>Reach Back</title>
    <link rel="stylesheet" type="text/css" href=${assets['app.css']} />
  </head>
  <body>
    <div id="app">${app}</div>

    <script id="__SERVER_PASSED__">
      window.__INITIAL_PROPS__ = ${devalue(data)};
      window.__STATE__ = ${devalue(initialState)};
      window.__SERVER_PATH__ = '${path}';
    </script>

    ${assets['vendor.js'] ? `<script src=${assets['vendor.js']}></script>` : ''}
    <script src=${assets['app.js']} defer></script>
  </body>
  </html>
`
