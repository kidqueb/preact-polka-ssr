import { h } from 'preact'
import fs from 'fs'
import polka from 'polka'
import spdy from 'spdy'
import sirv from 'sirv'
import compression from 'compression'
import renderToString from 'preact-render-to-string'
import { Provider } from 'unistore/preact'

import routes from '../routes'
import createStore from '../shared/store'
import { getMatchingRoute } from '../shared/lib/routerUtil'
import { render, HTML } from './util'

const ssl = {
  key: fs.readFileSync('_config/ssl/local.key'),
  cert:  fs.readFileSync('_config/ssl/local.crt')
}

/**
 * Create Polka handler, register middleware & routes
 */
const { handler } = polka()
  .use(compression())
  .use(sirv('dist'))
  .get('/favicon.ico', (req, res) => res.end()) // hacky
  .get('*', (req, res) => {
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
const server = spdy.createServer(ssl, handler)
server.listen(3000, (error) => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log('Running @ https://localhost:3000')
  }
})
