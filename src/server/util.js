import devalue from 'devalue'

/**
 * If we are dealing with an async route we need to first load it in.
 * Then handle the actual calling of `getInitialProps` if necessary.
 * If the component isn't async, just try calling getInitialProps
 */
export const asyncPrep = async ({ route, ...ctx }) => {
  const promises = []
  let Component = route.component

  // If it's an async route wait for the component to load
  if (route.getComponent) {
    const c = await route.getComponent()
    Component = c.default || c
  }

  // Once we are sure we have a component, check to see if it
  // has a static `getInitialProps` method we need to run
  if (Component && Component.getInitialProps !== undefined)
    promises.push(Component.getInitialProps(ctx))

  // If we have promises to resolve do it otherwise return
  // an empty object as our initial props
  return {
    Component,
    initialProps: promises.length ? (await Promise.all(promises))[0] : {}
  }
}

/*
 * The main document we render our app into.
 * [TODO] - setup `preact-helmet` or something similar
 */
export const renderDocument = ({ app, assets, initialProps, initialState, params, path }) => `
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
