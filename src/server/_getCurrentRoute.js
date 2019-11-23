import makeMatcher from "wouter-preact/matcher";

import routes from "../routes";
const matcher = makeMatcher();

/**
 * Find out what route should be displayed and return it along 
 * with the parsed parameters from the route's path pattern.
 * @param {object} req - polka's request object
 */
export default async req => {
	let CurrentRoute, routeParams, route;

	for (let index = 0; index < routes.length; index++) {
		route = routes[index];

		// Find out if the route matches the url.
		const [matches, params] = matcher(route.path, req.url);

		// Move on if it's determined to not be the current route.
    if (!matches) continue;
		
		// Set our route params since we know we have a match.
    routeParams = params;

		// If `route.component` is present we can just set it outright.
		if (route.component) CurrentRoute = route.component;

		// If it's an async route then get the component and break the loop.
		if (route.getComponent) {
			const c = await route.getComponent();
			CurrentRoute = c.default || c;
			break;
    }
	}

	return [CurrentRoute, routeParams];
};
