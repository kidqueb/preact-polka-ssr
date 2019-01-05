import createStore from 'unistore'
import { connect as uconnect } from 'unistore/preact'
import devtools from 'unistore/devtools'

import { foods } from './containers/foods'

const initialState = {
  foods
}

export function connect(mapStateToProps, actions) {
  return C => {
    const c  = uconnect(mapStateToProps, actions)(C)
    if (C.getInitialProps) c.getInitialProps = C.getInitialProps
    return c
  }
}

export default (state = initialState) =>
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ? devtools(createStore(state))
    : createStore(state)
