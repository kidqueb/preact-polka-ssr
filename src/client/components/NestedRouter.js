import { h, Fragment, toChildArray } from "preact";
import { useRouter, useLocation } from "wouter-preact";

import getRouterHook from "../../lib/getRouterHook";

export default ({ req, base, children }) => {
	const hook = getRouterHook(req); // Determine if it's SSR or browser
	const router = useRouter({ hook, base }); // Set reference to our router
	const [location] = useLocation(); // Set reference of the url

	// If the current url doesn't start with our `base` then there's no way
	// that a nested route would be match so we can just return null.
	return location.startsWith(base) 
		? toChildArray(children).map(child => {
				const [matches, params] = router.matcher(base + child.props.path, location);

				return matches 
					? h(child.type, { ...params, ...child.props })
					: null
			})
	  : null;
};
