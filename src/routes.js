import { h } from 'preact'
import Dashboard from './pages/Dashboard'

/**
 * Route tree
 */
const routes = [
  { path: '/', component: Dashboard },
  { path: '/discover', getComponent: getDiscover}
]

/**
 * Async route functions
 */
const getDiscover = () => import(
  './pages/Discover'
  /* webpackChunkName: "discover" */
)

export default routes
