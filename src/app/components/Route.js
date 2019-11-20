import { h } from "preact";
import { useRoute } from "wouter-preact";

import useInitialProps from "../lib/useInitialProps";

export default route => {
  const useRouteMatch = useRoute(route.path);
  const [Component, initialProps] = useInitialProps(route);

	// `route.match` is present - Route is controlled by the Switch
	const [matches, params] = route.match || useRouteMatch;

	if (!matches) return null;

	return Component ? <Component {...initialProps} /> : null;
};
