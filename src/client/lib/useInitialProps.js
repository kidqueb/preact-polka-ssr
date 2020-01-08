import { useState, useEffect } from "preact/hooks";

export default ({ params, store, component, getComponent }) => {
	const [{ routeComponent, initialProps }, setRouteData] = useState({});

	useEffect(async () => {
		let c,
			iP = {};

		if (component) c = component;
		else if (getComponent) {
			const m = await getComponent();
			c = m.default || m;
		}

		if (c.getInitialProps) iP = await c.getInitialProps({ params, store });

		setRouteData({ routeComponent: c, initialProps: iP });

		return () => null;
	}, []);

	return [routeComponent, initialProps];
};
