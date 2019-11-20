import { useState, useEffect } from "preact/hooks";

export default route => {
	const [{ routeComponent, initialProps }, setRouteData] = useState({});

	useEffect(async () => {
		let c,
			iP = {};

		if (route.component) c = route.component;
		else if (route.getComponent) {
			const m = await route.getComponent();
			c = m.default || m;
		}

		if (c.getInitialProps) iP = await c.getInitialProps();

		setRouteData({ routeComponent: c, initialProps: iP });

		return () => null;
	}, []);

	return [routeComponent, initialProps];
};
