import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useRoute } from "wouter-preact";

/**
 * Handle
 */
export default ({ path, match, store, component, getComponent }) => {
	const useRouteMatch = useRoute(path);
	const [[Component, initialProps], setRoute] = useState([component]);

	// `match` is an array from Switch and NestedRouter
	const [matches, params] = match || useRouteMatch;
	if (!matches) return null;

	useEffect(async () => {
		let c = component,
			iP = {};

		if (!c) {
			const m = await getComponent();
			c = m.default || m;
		}

		if (c.getInitialProps) iP = await c.getInitialProps({ params, store });

		setRoute([c, iP]);
		return () => null;
	}, []);

	// If no component is present return null.
	if (!Component) return null;

	// If the component doesn't need `initialProps` render the component.
	if (!Component.getInitialProps)
		return <Component {...{ path, params }} />;

	// Wait for `initialProps` in order to render the component
	if (Component.getInitialProps && initialProps) 
		return <Component {...{ path, params, ...initialProps }} />
};
