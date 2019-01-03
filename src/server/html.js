import devalue from 'devalue'

/*
 * The main document we render our app into.
 * TODO: setup `preact-helmet`
 */
export default ({ app, assets, initialProps, initialState, params, path }) => `
  <html>
  <head>
    <title>Project Title</title>
    <link rel="stylesheet" type="text/css" href=${assets['app.css']} />
  </head>
  <body>
    <div id="app">${app}</div>

    <script id="__SSR_DATA__">
      window.__SSR_DATA__ = ${devalue({
        initialProps,
        initialState,
        params,
        path
      })}
    </script>

    ${assets['vendor.js'] ? `<script src=${assets['vendor.js']}></script>` : ''}
    <script src=${assets['app.js']} defer></script>
  </body>
  </html>
`
