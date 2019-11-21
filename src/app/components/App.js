import { h } from "preact";
import { Router } from "wouter-preact"

import Header from "./Header"

export default ({ hook, children }) => (
	<Router hook={hook}>
		<div id="app">
			<Header />
			<div>
				{children}
			</div>
		</div>
	</Router>
);