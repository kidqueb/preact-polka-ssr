/**
 * C:  Component
 * iP: initialProps
 */
import { h, Component } from 'preact'
import { exec } from '../server/lib/routerUtil'

class Route extends Component {
  constructor({ getComponent, component = null, path, url }) {
    super()
    let params = exec(url, path, true)
    this.state = { C: component, iP: {}, params }
    if (getComponent) this.l(getComponent, params)
  }

  async componentDidMount() {
    if (this.props.getComponent) return

    let { C, params } = this.state
    let iP = await C.getInitialProps({ params })
    this.setState({ iP })
  }

  async l(getComponent, params) {
    let c = await getComponent()
    let C = c.default || c
    let iP = await C.getInitialProps({ params })
    this.setState({ C, iP })
  }

  render(_, { C, iP }) {
    return C ? <C {...iP} /> : null
  }
}

export default Route
