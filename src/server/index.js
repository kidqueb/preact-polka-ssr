import { h } from 'preact'
import '@babel/polyfill'
import fs from 'fs'
import polka from 'polka'
import sirv from 'sirv'
import compression from 'compression'
import renderToString from 'preact-render-to-string'
import { Provider } from 'unistore/preact'

import routes from '../routes'
import createStore from '../store'
import { getMatchingRoute } from './lib/routerUtil'
import loadInitialProps from './lib/loadInitialProps'
import ensureReady from './lib/ensureReady'
import renderHTML from './html'


/**
 * Create Polka server and register middlewares
 */
const server = polka()

server.use(compression())
server.use(sirv('dist'))
server.get('/favicon.ico', (req, res) => res.end()) // hack

/**
 * Register catch-all route. Page rendering is handled by preact-router
 * inside the <Router /> component. `url` is a required prop.
 */
server.get('*', (req, res) => {
  const assets = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'))
  const { route, params } = getMatchingRoute(routes, req.url)

  const promises = []
  promises.push(loadInitialProps(route, { req, res, params }))
  promises.push(ensureReady(route))

  // Wait for loadInitialProps and any async routes to load,
  // then render <App /> with the data and <Component />
  Promise.all(promises).then(({ data, Component }) => {
    const App = () => (
      <Provider store={createStore()}>
        <Component {...data} />
      </Provider>
    )

    const app = renderToString(<App /> )
    const html = renderHTML({ app, assets, data, path: route.path })
    res.end(html)
  })
})

/**
 * Start the server
 */
server.listen(3000, () => {
  console.log('Watching @ http://localhost:3000')
})
