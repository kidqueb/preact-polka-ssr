import { h, Component } from 'preact'

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

class Route extends Component {
  constructor({ getComponent, component }) {
    super()
    if (getComponent) this.f(getComponent)

    this.state = {
      A: component || false,
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

  componentDidUpdate() {
    if (this.state.A === false && this.props.getComponent)
      this.f(this.props.getComponent)
  }

  f(getComponent) {
    getComponent().then(async C => {
      const component = C.default || C

      const initialProps = component.getInitialProps
        ? await component.getInitialProps()
        : {}

      this.setState({ A: component, initialProps })
    })
  }

  render(props, { A, initialProps }) {
    const { getComponent } = props
    if (getComponent && A === false) return null

    const p = _objectWithoutProperties(
      {...props, ...initialProps},
      ['getComponent', 'url', 'matches']
    )

    return A ? <A {...p} /> : null
  }
}

export default Route
