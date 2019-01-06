import { h, Component } from 'preact'
import { exec } from '../../shared/lib/routerUtils'

class Route extends Component {
  constructor({ getComponent, component = null, path, url }) {
    super()
    const params = exec(url, path, true)

    this.state = {
      RouteComponent: component,
      initialProps: {},
      params
    }

    if (getComponent) this.l(getComponent, params)
  }

  async componentDidMount() {
    const { RouteComponent, params } = this.state
    if (this.props.getComponent || !RouteComponent.getInitialProps) return

    const initialProps = await RouteComponent.getInitialProps({ params })
    this.setState({ initialProps })

    if (RouteComponent && RouteComponent.setHead)
      RouteComponent.setHead({ initialProps, params }, head => this.setHead(head))
  }

  async l(getComponent, params) {
    const c = await getComponent()
    const RouteComponent = c.default || c
    const initialProps = await RouteComponent.getInitialProps({ params })

    this.setState({ RouteComponent, initialProps })

    if (RouteComponent.setHead)
      RouteComponent.setHead({ initialProps, params }, head => this.setHead(head))
  }

  setHead(head) {
    this.unsetHead = () => console.log('cleanup')
  }

  componentWillUnmount() {
    if (this.unsetHead) this.unsetHead()
  }

  render = (_, { RouteComponent, initialProps }) =>
    RouteComponent ? <RouteComponent {...initialProps} /> : null
}

export default Route
