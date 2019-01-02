import { h } from 'preact'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'

/**
 * Route tree
 */
const routes = [
  { path: '/', component: Dashboard },
  { path: '/discover', component: Discover }
]

export default routes
