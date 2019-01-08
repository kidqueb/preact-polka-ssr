import { h, Component } from 'preact'

import { exec } from '../../shared/lib/routerUtils'
import setHead from '../lib/setHead'

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

    if (component && component.setHead)
      this.unsetHead = setHead(component.setHead(params))
  }

  async componentDidMount() {
    const { RouteComponent, params } = this.state
    if (this.props.getComponent || !RouteComponent.getInitialProps) return

    const initialProps = await RouteComponent.getInitialProps({ params })
    this.setState({ initialProps })
  }

  async l(getComponent, params) {
    const c = await getComponent()
    const RouteComponent = c.default || c
    const initialProps = await RouteComponent.getInitialProps({ params })

    this.setState({ RouteComponent, initialProps })

    if (RouteComponent.setHead)
      this.unsetHead = setHead(RouteComponent.setHead(params))
  }

  componentWillUnmount() {
    if (this.unsetHead) this.unsetHead()
  }

  render = (_, { RouteComponent, initialProps }) =>
    RouteComponent ? <RouteComponent {...initialProps} /> : null
}

export default Route
