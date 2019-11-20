import { h, hydrate } from "preact";
import { Switch } from "wouter-preact"

import "./styles/app.scss";
import routes from "../routes";
import Route from "./components/Route"

if (typeof window !== undefined) {
	const App = () => (
		<div id="app">
			<Switch>
				{routes.map(route => {
					let initialProps = {};
					const props = { ...route, ...initialProps };
					return <Route key={route.path} {...props} />;
				})}
			</Switch>
		</div>
	);

	// Hydrate the app
	const container = document.getElementById("app");
	hydrate(<App />, container, container.lastChild);
}
