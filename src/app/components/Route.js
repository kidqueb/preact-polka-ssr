import { h, Component } from 'preact';
import { parse, exec } from 'matchit';

import setHead from '../lib/setHead';

class Route extends Component {
  constructor({ getComponent, component, path, url, ...initialProps }) {
    super();
    const params = exec(url, parse(path));
    this.state = { RC: component, initialProps, params };

    // If we have a `getComponent` method then we have to first load
    // the async component before we can check for `getInitialProps`
    if (getComponent) this.l(getComponent);
  }

  async componentDidMount() {
    if (this.props.getComponent) return;
    this.handleStaticMethods(this.state.RC);
  }

  async l(getComponent) {
    const c = await getComponent();
    const RC = c.default || c;
    this.handleStaticMethods(RC);
  }

  handleStaticMethods = async RC => {
    let initialProps = { ...this.state.initialProps };

    // This flag is set at the end of this function. The first load has data
    // provided from the server and passes it into our front-end so skip these.
    if (window.__HAS_NAVIGATED__ === true) {
      const { params } = this.state;
      const { store } = this.context;

      if (RC.getInitialProps)
        initialProps = await RC.getInitialProps({ params, store });

      if (RC.setHead) this.unsetHead = setHead(RC.setHead(params));
    }

    if (!window.__HAS_NAVIGATED__) window.__HAS_NAVIGATED__ = true;
    this.setState({ RC, initialProps });
  };

  componentWillUnmount() {
    if (this.unsetHead) this.unsetHead();
  }

  render = (_, { RC, initialProps }) => (RC ? <RC {...initialProps} /> : null);
}

export default Route;
