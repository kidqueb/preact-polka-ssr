import { h, hydrate } from "preact";
import { Switch } from "wouter-preact";
import useLocation from "wouter-preact/use-location"

import "./styles/app.scss";
import App from "./components/App";
import routes from "../routes";
import Route from "./components/Route";

import createStore from "../store"

// Hydrate the app
if (typeof window !== "undefined") {
	const container = document.body;
	const store = createStore()

	const AppWithRoutes = () => (
		<App hook={useLocation} store={store}>
			<Switch>
				{routes.map(route => <Route key={route.path} {...({...route, store })} />)}
			</Switch>
		</App>
	);

	hydrate(<AppWithRoutes />, container, container.firstChild);
}
