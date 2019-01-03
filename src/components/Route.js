/**
 * Completely ripped from "preact-route-async"
 * Added all the hackiness to fake `getInitialProps`
 */
import { h, Component } from 'preact'

class Route extends Component {
  constructor({ getComponent, component = false }) {
    super()
    if (getComponent) this.f(getComponent)

    this.state = {
      A: component,
      gotInitialProps: false,
      initialProps: {}
    }
  }

  async componentDidMount() {
    const { A } = this.state

    const initialProps = A && A.getInitialProps
      ? await A.getInitialProps()
      : {}

      this.setState({ initialProps })
  }

  async f(getComponent) {
    const C = await getComponent()
    const A = C.default || C

    const initialProps = A.getInitialProps
      ? await A.getInitialProps()
      : {}

    this.setState({ A, initialProps })
  }

  render(props, { A, initialProps }) {
    const { getComponent } = props
    if (getComponent && A === false) return null
    return A ? <A {...initialProps} /> : null
  }
}

export default Route
