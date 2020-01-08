import getCurrentRoute from "./_getCurrentRoute"

/**
 * If we are dealing with an async route we need to first load it in.
 * Then handle the actual calling of `getInitialProps` if necessary.
 * If the component isn't async, just try calling getInitialProps
 */
export default async (req, store) => {
  const promises = [];
  const [CurrentRoute, params] = await getCurrentRoute(req)

  if (!CurrentRoute) return;

  // Once we are sure we have a component, check to see if it
  // has a static `getInitialProps` method we need to run
  if (CurrentRoute.getInitialProps) 
    promises.push(CurrentRoute.getInitialProps({ params, store }));

  // If we have promises to resolve do it otherwise return
  // an empty object as our initial props
  return {
    CurrentRoute,
    params,
    initialProps: promises.length ? (await Promise.all(promises))[0] : {}
  };
};