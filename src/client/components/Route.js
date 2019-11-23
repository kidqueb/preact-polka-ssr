import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useRoute } from "wouter-preact";

/**
 * Handle routes based on if they supply a component to use or if we need
 * to import an async component via `getComponent`. After a component is set
 * determine if we have `initalProps` to load before it is rendered.
 * @param {object} props
 * @param {string} props.path - the route's url patter
 * @param {array} props.match - result of comparing the `location` and `path` with `matcher`
 * @param {object} props.store - storeon instance
 * @param {function} props.component - Preact component
 * @param {function} props.getComponent - Dynamic import
 */
export default ({ path, match, store, component, getComponent }) => {
	const useRouteMatch = useRoute(path);
	const [[Component, initialProps], setRoute] = useState([component]);

	// `match` is an array from Switch and NestedRouter
	const [matches, params] = match || useRouteMatch;
	if (!matches) return null;

	// When the component is ready to be rendered kickoff the process of
	// loading async components if needed and processing and `initialProps`
	// That need to be set. 
	useEffect(async () => {
		let c = component, iP = {};

		// If component was undefined we should try grabbing an async component.
		if (!c && getComponent) {
			const m = await getComponent();
			c = m.default || m;
		}

		// If the component has a `getInitialProps` function we can prevent any
		// unnecessary work by checking to see if it is the initial page load and 
		// use the `initialProps` set by the server.
		if (c.getInitialProps) {
			if (typeof window !== "undefined" && window.__SSR_DATA__) {
				iP = window.__SSR_DATA__.initialProps
				window.__SSR_DATA__ = null
			} else {
				iP = await c.getInitialProps({ params, store });
			}
		}

		// Set our component to be rendered and any `initialProps` we grabbed
		setRoute([c, iP]);

		// `useEffect` requires a function to be returned so just return null
		return () => null;
	}, []);

	// If no component is present it's probably async.. return null for now.
	if (!Component) return null;

	// We've determined our route component. If component doesn't 
	// need `initialProps` we can just render the component as is.
	if (!Component.getInitialProps)
		return <Component {...{ path, params }} />;

	// If there is a `getInitialProps` function wait for our `initialProps`
	// to be set and then render the component passing in those props.
	if (Component.getInitialProps && initialProps) 
		return <Component {...{ path, params, ...initialProps }} />
};
