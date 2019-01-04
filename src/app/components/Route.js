import { h, Component } from 'preact'
import { exec } from '../../shared/lib/routerUtils'

class Route extends Component {
  constructor({ getComponent, component = null, path, url }) {
    super()
    let params = exec(url, path, true)
    this.state = { RouteComponent: component, initialProps: {}, params }
    if (getComponent) this.l(getComponent, params)
  }

  async componentDidMount() {
    let { RouteComponent, params } = this.state
    if (this.props.getComponent || !RouteComponent.getInitialProps) return
    this.setState({ initialProps: await RouteComponent.getInitialProps({ params }) })
  }

  async l(getComponent, params) {
    let component = await getComponent()
    let RouteComponent = component.default || component

    this.setState({
      RouteComponent,
      initialProps: RouteComponent.getInitialProps
        ? await RouteComponent.getInitialProps({ params })
        : {}
    })
  }

  render = (_, { RouteComponent, initialProps }) =>
    RouteComponent ? <RouteComponent {...initialProps} /> : null
}

export default Route
