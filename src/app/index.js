import { h, render } from 'preact'
import PreactRouter from 'preact-router'
import { Provider } from 'unistore/preact'

import './styles/app.scss'
import routes from '~/routes'
import createStore from '~/shared/store'
import Route from 'components/Route'

if (typeof window !== undefined) {
  const root = document.getElementById('app')
  const { initialProps, initialState, path = '/' } = window.__SSR_DATA__
  const store = createStore(initialState)

  const App = () => (
    <Provider store={store}>
      <PreactRouter>
        {routes.map(route => {
          // Only the current route needs `initialProps`
          const props = path === route.path ? { ...route, ...initialProps } : route
          return <Route key={route.path} {...props} />
        })}
      </PreactRouter>
    </Provider>
  )

  // Render the app.
  render(<App />, root, root.lastChild)

  // Register service worker
  if ('serviceWorker' in navigator && window.location.protocol === 'https') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(r => { console.log('SW registered: ', r) })
        .catch(e => { console.log('SW registration failed: ', e) })
    })
  }

  // Remove server rendered js from the document
  // No clue if this does anything, really..
  delete window.__SSR_DATA__
  const el = document.getElementById('__SSR_DATA__')
  el.parentNode.removeChild(el)
}
