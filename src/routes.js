import { h } from 'preact'
import Dashboard from './pages/Dashboard'

/**
 * Async route functions
 */
const getDiscover = () => import(
  './pages/Discover'
  /* webpackChunkName: "discover" */
)
const getError = () => import(
  './pages/Error'
  /* webpackChunkName: "error" */
)

/**
 * Route tree
 */
const routes = [
  { path: '/', component: Dashboard },
  { path: '/discover/:id', getComponent: getDiscover},
  { getComponent: getError, default: true }
]

export default routes
