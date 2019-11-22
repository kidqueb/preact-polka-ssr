import { h } from "preact";
import { Router } from "wouter-preact"
import { Provider } from 'storeon/preact/context'

import Header from "./Header"

export default ({ hook, store, children }) => (
	<Provider value={store}>
		<Router hook={hook}>
			<div id="app">
				<Header />
				<div>
					{children}
				</div>
			</div>
		</Router>
	</Provider>
);