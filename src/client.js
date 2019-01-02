import { h, render } from 'preact'
import '@babel/polyfill'
import PreactRouter from 'preact-router'
import Route from 'preact-route-async'
import { Provider } from 'unistore/preact'

import './styles/app.scss'
import createStore from './store'
import routes from './routes'

/*
 * Map our `routes` into the <Router /> component
 */
const Router = ({ url, data }) => (
  <PreactRouter url={url}>
    {routes.map(route => <Route {...route} {...data} />)}
  </PreactRouter>
)

/*
 * For the browser only we wrap our <Router /> with the
 * <Provider /> so we can access our `unistore` state object.
 */
export const App = ({ store, ...props }) => {
  return (
    <Provider store={store}>
      <Router {...props} />
    </Provider>
  )
}

const cleanJs = key => {
  delete window[key]
  const el = document.getElementById(key)
  el.parentNode.removeChild(el)
}

if (typeof window !== 'undefined') {
  const root = document.getElementById('app')
  const store = createStore(window.__STATE__)
  const props = window.__INITIAL_PROPS__

  // Remove server rendered js from the dom. Not a fan.
  cleanJs('__INITIAL_PROPS__')
  cleanJs('__STATE__')

  // Render the app.
  render(<App store={store} data={props} />, root, root.lastChild)
}
