/**
 * Handles the actual loading of `initialProps` into our component's
 * `this.props` by calling it's `getInitialProps` function.
 */
export default async function loadInitialProps(route, ctx) {
  const promises = []
  let component = route.component

  if (route.getComponent) {
    const res = await route.getComponent()
    component = res.default ? res.default : res
  }

  if (component && component.getInitialProps !== undefined) {
    promises.push(component.getInitialProps({ ...ctx }))
  }

  return promises.length
    ? (await Promise.all(promises))[0]
    : {}
}
