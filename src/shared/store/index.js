import createStore from 'unistore'
import { connect as uconnect } from 'unistore/preact'
import devtools from 'unistore/devtools'

import { foods } from './containers/foods'

const initialState = {
  foods
}

/**
 * The standard `connect` from `unistore` wraps components in a function
 * so the server never finds `getInitialProps` on the child. So we add it
 * to the function returned from `connect`
 */
export function connect(mapStateToProps, actions) {
  return C => {
    const c  = uconnect(mapStateToProps, actions)(C)
    if (C.getInitialProps) c.getInitialProps = C.getInitialProps
    return c
  }
}

/**
 * Because of the way state is structured in containers it's a little
 * easier to bind actions to that specific container's root. This prevents
 * us from having to `{ ...state.container, newVal }` in every action.
 */
export function bindActions(key, actions) {
  let a = {}

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    a[action.name] = (state, params) => {
      const val = action(state, params)
      return { [key]: { ...state[key], ...val } }
    }
  }

  return a
}

/**
 * A function to create our store and include redux devtools in development.
 * Also, makes sure we're in the browser since there are no server devtools.
 */
export default (state = initialState) =>
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ? devtools(createStore(state))
    : createStore(state)
