import { h, Fragment, toChildArray } from "preact";
import { useRouter, useLocation } from "wouter-preact";

import getRouterHook from "../../shared/lib/getRouterHook";

export default ({ req, base, children }) => {
	const hook = getRouterHook(req);
	const router = useRouter({ hook, base });
	const [location] = useLocation();

	return location.startsWith(base) 
		? toChildArray(children).map(child => {
				const [matches, params] = router.matcher(base + child.props.path, location);

				return matches 
					? h(child.type, { ...params, ...child.props })
					: null
			})
	  : null;
};
