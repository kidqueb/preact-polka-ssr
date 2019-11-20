import { h } from "preact";
import { useRoute } from "wouter-preact";

import useInitialProps from "../lib/useInitialProps";

export default ({ path, match, component, getComponent }) => {
  const useRouteMatch = useRoute(path);
  const [Component, initialProps] = useInitialProps({ component, getComponent });

	// `match` is present - Route is controlled by the Switch
	const [matches, params] = match || useRouteMatch;

	if (!matches) return null;

	return Component ? <Component {...({ params, ...initialProps })} /> : null;
};
