import devalue from 'devalue';

const assets = JSON.parse(fs.readFileSync("./dist/manifest.json", "utf8"));

/*
 * The main document we render our app into.
 */
export default ({ app, initialProps, initialState }) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${initialProps.pageTitle || 'Default Title'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A preact app with ssr served by polka.">
    <meta name="theme-color" content="#333"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
    <link rel="manifest" href="/assets/site.webmanifest">
    <link rel="stylesheet" type="text/css" href=${assets['client.css']} />
  </head>
  <body>
    ${app}

    <script id="__SSR_DATA__">
      window.__SSR_DATA__ = ${devalue({ initialProps, initialState })}
    </script>

    ${assets['vendor.js'] ? `<script src=${assets['vendor.js']} defer></script>` : ''}
    <script src=${assets['client.js']} defer></script>
  </body>
  </html>
`;