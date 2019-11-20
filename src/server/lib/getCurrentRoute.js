import makeMatcher from "wouter-preact/matcher";

import routes from "../../routes";

const matcher = makeMatcher();

export default async req => {
	let CurrentRoute, routeParams, route;

	for (let index = 0; index < routes.length; index++) {
		route = routes[index];

		// Find out if the route matches the url
		const [matches, params] = matcher(route.path, req.url);

		// Break if its not the current route
    if (!matches) continue;
    
    routeParams = params;

		// Break if we set a component
		if (route.component) CurrentRoute = route.component;

		// If it's an async route get the component then break
		if (route.getComponent) {
			const c = await route.getComponent();
			CurrentRoute = c.default || c;
    }
    
    break;
	}

	return [CurrentRoute, routeParams];
};
