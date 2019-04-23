import { createElement, Component } from 'preact';
import { SUBSCRIBERS, getCurrentUrl, handleLinkClick as onClick } from './lib';

function memoClass() {
  let cache = {}

  return (...args) => {
    const key = JSON.stringify(args)

    if (cache[key]) {
      return cache[key]
    } else {
      const props = args[0]

      return cache[key] = [
        typeof props.class !== 'undefined' && props.class,
        args[1].replace(/\?.+$/, '') === props.href && props.activeClass
      ].filter(Boolean).join(' ')
    }
  }
}

class Link extends Component {
  constructor(props) {
    super(props)
    this.getClass = memoClass()
  }

  update = url => {
    this.nextUrl = url;
    this.setState({});
  };

  componentDidMount() {
    SUBSCRIBERS.push(this.update);
  }

  componentWillUnmount() {
    SUBSCRIBERS.splice(SUBSCRIBERS.indexOf(this.update) >>> 0, 1);
  }

  render(props) {
    return createElement('a', {
      ...props,
      onClick,
      class: this.getClass(props, this.nextUrl || getCurrentUrl())
    });
  }
}

export default Link;
