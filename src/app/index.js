import { h, hydrate } from "preact";
import { Switch } from "wouter-preact";
import useLocation from "wouter-preact/use-location";

import "./styles/app.scss";
import App from "./components/App";

import routes from "../routes";
import Route from "./components/Route";

// Hydrate the app
if (typeof window !== undefined) {
	const container = document.body;

	const AppWithRoutes = () => (
		<App hook={useLocation}>
			<Switch>
				{routes.map(route => <Route key={route.path} {...route} />)}
			</Switch>
		</App>
	);

	hydrate(<AppWithRoutes />, container, container.firstChild);
}
