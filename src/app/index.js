import { h, hydrate } from 'preact';
import { Provider } from 'unistore/preact';

import './styles/app.scss';
import routes from '~/routes';
import createStore from '~/shared/store';
import { Router, Route } from './components/Router';

if (typeof window !== undefined) {
  const { initialProps, initialState, path = '/' } = window.__SSR_DATA__;
  const store = createStore(initialState);

  const App = () => (
    <Provider store={store}>
      <Router>
        {routes.map(route => {
          // Only the current route needs `initialProps`
          const props = path === route.path ? { ...route, ...initialProps } : route;
          return <Route key={route.path} {...props} />;
        })}
      </Router>
    </Provider>
  );

  // Hydrate the app
  hydrate(<App />, document.getElementById('app'));

  // Register service worker
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(r => {
          console.log('SW registered: ', r);
        })
        .catch(e => {
          console.log('SW registration failed: ', e);
        });
    });
  }

  // Clean passed data from the dom, cause gross
  const el = document.getElementById('__SSR_DATA__');
  el.parentNode.removeChild(el);
}
