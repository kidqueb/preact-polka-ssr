/**
 * C:  Component
 * iP: initialProps
 */
import { h, Component } from 'preact'

class Route extends Component {
  constructor({ getComponent, component = null }) {
    super()
    if (getComponent) this.l(getComponent)
    this.state = { C: component, iP: {} }
  }

  async componentDidMount() {
    let { C } = this.state
    let iP = C && C.getInitialProps ? await C.getInitialProps() : {}
    this.setState({ iP })
  }

  async l(getComponent) {
    let c = await getComponent()
    let C = c.default || c
    let iP = C.getInitialProps ? await C.getInitialProps() : {}
    this.setState({ C, iP })
  }

  render({ getComponent }, { C, iP }) {
    return C
      ? <C {...iP} />
      : null
  }
}

export default Route
