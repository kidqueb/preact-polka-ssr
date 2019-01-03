import { h } from 'preact'
import Dashboard from './pages/Dashboard'

/**
 * Async route functions
 */
const getDiscover = () => import(
  './pages/Discover'
  /* webpackChunkName: "discover" */
)

/**
 * Route tree
 */
const routes = [
  { path: '/', component: Dashboard },
  { path: '/discover/:id', getComponent: getDiscover}
]

export default routes
