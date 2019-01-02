import { h } from 'preact'
import '@babel/polyfill'
import fs from 'fs'
import polka from 'polka'
import sirv from 'sirv'
import compression from 'compression'
import renderToString from 'preact-render-to-string'
import devalue from 'devalue'

import routes from './routes'
import createStore from './store'
import { getMatchingRoute } from './lib/routerUtil'
import loadInitialProps from './lib/loadInitialProps'
import { App } from './client'

/*
 * The main document we render our app into.
 * TODO: setup `preact-helmet`
 */
const renderDocument = ({ app, assets, data, initialState }) => `
  <html>
  <head>
    <title>Reach Back</title>
    <link rel="stylesheet" type="text/css" href=${assets['app.css']} />
  </head>
  <body>
    <div id="app">${app}</div>

    <script id="__INITIAL_PROPS__">window.__INITIAL_PROPS__ = ${devalue(data)}</script>
    <script id="__STATE__">window.__STATE__ = ${devalue(initialState)}</script>

    ${assets['vendor.js'] ? `<script src=${assets['vendor.js']}></script>` : ''}
    <script src=${assets['app.js']} defer></script>
  </body>
  </html>
`

/**
 * Create Polka server and register middlewares
 */
const server = polka()

server.use(compression())
server.use(sirv('dist'))

// hack
server.get('/favicon.ico', (req, res) => res.end())

/**
 * Register catch-all route. Page rendering is handled by preact-router
 * inside the <Router /> component. `url` is a required prop.
 */
server.get('*', async (req, res) => {
  const assets = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'))
  const { route, params } = getMatchingRoute(routes, req.url)

  const store = createStore()
  const data = await loadInitialProps(route, { req, res, params })

  const app = renderToString(<App store={store} url={req.url} data={data} />)
  const html = renderDocument({ app, assets, data })
  res.end(html)
})

/**
 * Start the server
 */
server.listen(3000, () => {
  console.log('Watching @ http://localhost:3000')
})
