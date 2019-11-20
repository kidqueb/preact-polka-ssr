import { h } from "preact";
import { Router, Switch } from "wouter-preact"

import routes from "../../routes";
import Route from "./Route"
import Header from "./Header"

export default ({ hook }) => (
	<Router hook={hook}>
		<div id="app">
			<Header />
			<Switch>
				{routes.map(route => {
					let initialProps = {};
					const props = { ...route, ...initialProps };
					return <Route key={route.path} {...props} />;
				})}
			</Switch>
		</div>
	</Router>
);