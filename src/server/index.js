import { h } from 'preact'
import fs from 'fs'
import polka from 'polka'
import sirv from 'sirv'
import compression from 'compression'
import renderToString from 'preact-render-to-string'
import { Provider } from 'unistore/preact'

import routes from '../routes'
import createStore from '../shared/store'
import { getMatchingRoute } from '../shared/lib/routerUtil'
import { render, HTML } from './util'

/**
 * Create Polka server and register any middleware
 */
const server = polka()
server.use(compression())
server.use(sirv('dist'))
server.get('/favicon.ico', (req, res) => res.end()) // hacky

/**
 * Register catch-all route. Page rendering is handled by preact-router
 * inside the <Router /> component. `url` is a required prop.
 */
server.get('*', (req, res) => {
  const assets = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'))
  const { route, params } = getMatchingRoute(routes, req.url)

  // Wait for `loadInitialProps` and `ensureReady` to resolve,
  // then render <App /> with the `initialProps` and <Component />
  render({ req, res, route, params }).then(({ Component, initialProps }) => {
    const App = () => (
      <Provider store={createStore()}>
        <Component {...initialProps} />
      </Provider>
    )

    // Render our app, then the entire document
    const app = renderToString(<App /> )
    const html = HTML({ app, assets, params, initialProps, path: route.path })
    res.end(html)
  })
})

/**
 * Start the server
 */
server.listen(3000, () => {
  console.log('Watching @ http://localhost:3000')
})
