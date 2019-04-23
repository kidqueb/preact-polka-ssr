import { h, Component } from 'preact';
import { ROUTERS, getCurrentUrl, memoMatchingChildren, routeTo } from './lib';

if (typeof addEventListener === 'function') {
  addEventListener('popstate', () => {
    routeTo(getCurrentUrl());
  });
}

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = { url: props.url || getCurrentUrl() };
    this.getMatchingChildren = memoMatchingChildren();
  }

  shouldComponentUpdate(props) {
    if (props.static !== true) return true;

    return (
      props.url !== this.props.url || props.onChange !== this.props.onChange
    );
  }

  /** Check if the given URL can be matched against any children */
  canRoute(url) {
    return this.getMatchingChildren(this.props.children, url, false).length > 0;
  }

  /** Re-render children with a new URL to match against. */
  routeTo(url) {
    this._didRoute = false;
    this.setState({ url });

    // if we're in the middle of an update, don't synchronously re-route.
    if (this.updating) {
      return this.canRoute(url);
    } else {
      this.forceUpdate();
      return this._didRoute;
    }
  }

  componentWillMount() {
    this.updating = true;
  }

  componentDidMount() {
    ROUTERS.push(this);
    this.updating = false;
  }

  componentWillUnmount() {
    if (typeof this.unlisten === 'function') this.unlisten();
    ROUTERS.splice(ROUTERS.indexOf(this), 1);
  }

  componentWillUpdate() {
    this.updating = true;
  }

  componentDidUpdate() {
    this.updating = false;
  }

  render({ children, onChange }, { url }) {
    let active = this.getMatchingChildren(children, url, true);
    let current = active[0] || null;
    this._didRoute = !!current;

    if (url !== this.previousUrl) {
      this.previousUrl = url;

      if (typeof onChange === 'function') {
        onChange({ router: this, url, previous: this.previousUrl, current });
      }
    }

    return typeof current === 'object' && current;
  }
}

export { Router };
export { default as Link } from './Link';
export { default as Route } from './Route';
export { goTo } from './lib';
