import devalue from 'devalue'

/*
 * The main document we render our app into.
 * [TODO] - setup `preact-helmet` or something similar
 */
export default ({ app, assets, initialProps, initialState, params, path }) => `
  <html>
  <head>
    <title>Project Title</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
    <link rel="manifest" href="/assets/site.webmanifest">
    <link rel="stylesheet" type="text/css" href=${assets['app.css']} />
  </head>
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
