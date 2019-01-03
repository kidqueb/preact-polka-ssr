import { h, render } from 'preact'
import '@babel/polyfill'
import PreactRouter from 'preact-router'
import { Provider } from 'unistore/preact'

import './styles/app.scss'
import createStore from './store'
import routes from './routes'
import Route from './components/Route'

if (typeof window !== 'undefined') {
  const SERVER_PATH = window.__SERVER_PATH__

  /*
  * Map our `routes` into the <Router /> component
  */
  const Router = ({ url, data }) => {

    // Make sure only the current route is getting the
    // data passed from the server
    const mappedRoutes = routes.map(route => {
      const props = SERVER_PATH === route.path
        ? { ...route, ...data }
        : route

      return <Route key={route.path} {...props} />
    })

    return (
      <PreactRouter url={url}>
        {mappedRoutes}
      </PreactRouter>
    )
  }

  /*
  * In the browser we attach the Router and let that deal
  * with the displaying of our routes and app state.
  */
  const App = ({ store, ...props }) => {
    return (
      <Provider store={store}>
        <Router {...props} />
      </Provider>
    )
  }

  const root = document.getElementById('app')
  const store = createStore(window.__STATE__)
  const props = window.__INITIAL_PROPS__

  // Remove server rendered js from the dom cause why not..
  delete window.__INITIAL_PROPS__
  delete window.__STATE__
  delete window.__SERVER_PATH__
  const el = document.getElementById('__SERVER_PASSED__')
  el.parentNode.removeChild(el)

  // Render the app.
  render(<App store={store} data={props} />, root, root.lastChild)
}
