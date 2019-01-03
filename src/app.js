import { h, render } from 'preact'
import '@babel/polyfill'
import PreactRouter from 'preact-router'
import { Provider } from 'unistore/preact'

import './styles/app.scss'
import createStore from './store'
import routes from './routes'
import Route from './components/Route'

if (typeof window !== 'undefined') {
  const { initialProps, initialState, path } = window.__SSR_DATA__

  /*
  * Map our `routes` into the <Router /> component.
  * Only the current route needs `initialProps`
  */
  const Router = ({ url, initialProps }) => {
    return (
      <PreactRouter url={url}>
        {routes.map(route => {
          const props = path === route.path ? { ...route, ...initialProps } : route
          return <Route key={route.path} {...props} />
        })}
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
  const store = createStore(initialState)

  // Remove server rendered js from the dom cause why not..
  delete window.__SSR_DATA__
  const el = document.getElementById('__SSR_DATA__')
  el.parentNode.removeChild(el)

  // Render the app.
  render(<App store={store} initialProps={initialProps} />, root, root.lastChild)
}
