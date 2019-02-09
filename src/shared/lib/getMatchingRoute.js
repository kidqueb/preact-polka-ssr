import { exec, match, parse } from 'matchit';

export default (routes, url) => {
  let paths = [],
    route = null;

  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    if (r.path) paths.push(r.path);
    else route = r;
  }

  const parsed = paths.map(parse);
  const matched = match(url, parsed);
  const params = exec(url, matched);

  if (matched && matched[0] && matched[0].old) {
    for (let i = 0; i < routes.length; i++) {
      const r = routes[i];
      if (r.path === matched[0].old) {
        route = r;
        break;
      }
    }
  }

  return { route, params };
};
