import { h } from "preact";
import { useRoute } from "wouter-preact";

import useInitialProps from "../lib/useInitialProps";

export default ({ path, match, ...props }) => {
	const useRouteMatch = useRoute(path);

	// `match` is an array from Switch and NestedRouter
	const [matches, params] = match || useRouteMatch;

	if (!matches) return null;

	const [Component, initialProps] = useInitialProps(props);

	return Component 
		? <Component {...({ path, params, ...initialProps })} /> 
		: null;
};