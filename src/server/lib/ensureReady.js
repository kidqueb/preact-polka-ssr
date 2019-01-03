/**
 * We deal with some async routes so we need to load those
 * components in order to render their content on the server.
 * Load the route chunk into a promise and wait for it to resolve.
 */
export default async route => {
  const promises = []

  if (route.getComponent)
    promises.push(route.getComponent().then(c => c.default || c))

  return (await Promise.all(promises))[0]
}
