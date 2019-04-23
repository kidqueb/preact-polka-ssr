import { h, Component } from 'preact';
import { parse, exec } from 'matchit';

class Route extends Component {
  constructor({ getComponent, component, path, url, ...initialProps }) {
    super();
    this.state = {
      RC: component,
      params: exec(url, parse(path)),
      initialProps
    };

    // If we have a `getComponent` method then we have to first load
    // the async component before we can check for `getInitialProps`
    if (getComponent) this.l(getComponent);
  }

  componentDidMount() {
    if (this.props.getComponent) return;
    this.handleStaticMethods(this.state.RC);
  }

  async l(getComponent) {
    const c = await getComponent();
    const RC = c.default || c;
    this.handleStaticMethods(RC);
  }

  handleStaticMethods = async RC => {
    let { initialProps } = this.state;

    // This flag is set at the end of this function. The first load has data
    // provided from the server and passes it into our front-end so skip these.
    if (window.__HAS_NAVIGATED__ === true) {
      const { params } = this.state;
      const { store } = this.context;

      if (RC.getInitialProps) {
        initialProps = await RC.getInitialProps({ params, store });
      }
    }

    if (!window.__HAS_NAVIGATED__) window.__HAS_NAVIGATED__ = true;
    this.setState({ RC, initialProps });
  };

  render = (_props, { RC, initialProps }) => (RC ? <RC {...initialProps} /> : null);
}

export default Route;
