import { cloneElement } from 'preact';
import { exec, match, parse } from 'matchit';

const EMPTY = {};
export const ROUTERS = [];
export const SUBSCRIBERS = [];

export function getCurrentUrl() {
  let url = typeof location !== 'undefined' ? location : EMPTY;
  return `${url.pathname || ''}${url.search || ''}`;
}

export function handleLinkClick(e) {
  if (e.button == 0) {
    routeFromLink(e.currentTarget || e.target || this);
    return prevent(e);
  }
}

function routeFromLink(node) {
  // only valid elements
  if (!node || !node.getAttribute) return;

  let href = node.getAttribute('href'),
    target = node.getAttribute('target');

  // ignore links with targets and non-path URLs
  if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i)))
    return;

  // attempt to route, if no match simply cede control to browser
  return goTo(href);
}

export function goTo(url, replace = false) {
  if (typeof url !== 'string' && url.url) {
    replace = url.replace;
    url = url.url;
  }

  // only push URL into history if we can handle it
  if (canRoute(url)) setUrl(url, replace ? 'replace' : 'push');

  return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
  for (let i = ROUTERS.length; i--; ) {
    if (ROUTERS[i].canRoute(url)) return true;
  }

  return false;
}

function setUrl(url, type = 'push') {
  if (typeof history !== 'undefined' && history[type + 'State']) {
    history[type + 'State'](null, null, url);
  }
}

/** Tell all router instances to handle the given URL.  */
export function routeTo(url) {
  let didRoute = false;

  for (let i = 0; i < ROUTERS.length; i++) {
    if (ROUTERS[i].routeTo(url) === true) didRoute = true;
  }

  for (let i = SUBSCRIBERS.length; i--; ) {
    SUBSCRIBERS[i](url);
  }

  return didRoute;
}

function prevent(e) {
  if (e) {
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.stopPropagation) e.stopPropagation();
    e.preventDefault();
  }

  return false;
}

export function memoMatchingChildren() {
  let cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const [children, url, invoke] = args;

      let routes = [],
        errorComponent = null,
        l = children.length;

      // Create route strings for matchit to parse and to get an error component
      for (let i = 0; i < l; i++) {
        const vnode = children[i];

        if (vnode.props.path) {
          routes.push(vnode.props.path);
        } else {
          errorComponent = vnode;
          break;
        }
      }

      const parsed = routes.map(parse);
      const matched = match(url, parsed);
      const params = exec(url, matched);

      if (matched && matched[0]) {
        routes = []; // reuse var cause cool kids do it

        for (let i = l; i--; ) {
          const child = children[i];
          if (child.props.path === matched[0].old && invoke) {
            let { ref: _r, key: _k, ...props } = { ...child, ...params, url };
            routes.push(cloneElement(child, props));
          }
        }
      }

      return (cache[key] = routes.length ? routes : [errorComponent]);
    }
  };
}
