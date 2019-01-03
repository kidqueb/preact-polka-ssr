import { h } from 'preact'
import Dashboard from './app/pages/Dashboard'

/**
 * Async route functions
 */
const getDiscover = () => import(
  './app/pages/Discover'
  /* webpackChunkName: "discover" */
)
const getError = () => import(
  './app/pages/Error'
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
