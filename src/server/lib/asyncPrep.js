/**
 * If we are dealing with an async route we need to first load it in.
 * Then handle the actual calling of `getInitialProps` if necessary.
 * If the component isn't async, just try calling getInitialProps
 */
export default async ({ route, ...ctx }) => {
  const promises = [];
  let Component = route.component;

  // If it's an async route wait for the component to load
  if (route.getComponent) {
    const c = await route.getComponent();
    Component = c.default || c;
  }

  // Once we are sure we have a component, check to see if it
  // has a static `getInitialProps` method we need to run
  if (Component.getInitialProps) promises.push(Component.getInitialProps(ctx));

  // If we have promises to resolve do it otherwise return
  // an empty object as our initial props
  return {
    Component,
    initialProps: promises.length ? (await Promise.all(promises))[0] : {}
  };
};
