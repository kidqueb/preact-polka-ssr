import { h } from "preact";
import polka from "polka";
import sirv from "sirv";
import useStaticLocation from "wouter-preact/static-location";
import renderToString from "preact-render-to-string";

import createStore from "../store"
import asyncPrep from "./_asyncPrep";
import renderDocument from "./_renderDocument";
import App from "../client/components/App";

const isDev = process.env.NODE_ENV === "development";

/**
 * Create Polka handler, register middleware & routes
 */
const server = polka()
	.use(sirv("dist"))
	.get("*", (req, res, next) => {
		const store = createStore()

		// Wait for `loadInitialProps` and `ensureReady` to resolve,
		// then render <App /> with the `initialProps` and <Component />
		asyncPrep(req, store)
			.then(payload => {
				if (!payload) return next();
				const { CurrentRoute, params, initialProps } = payload;

				// Render our app passing in the static location and fresh store object
				const app = renderToString(
					<App hook={useStaticLocation(req.url)} store={store}>
						<CurrentRoute {...({req, params, ...initialProps})} />
					</App>
				);

				// Render the html document with our rendered app, initialProps 
				// and the store's current state to hydrate the client.
				const html = renderDocument({ 
					app, 
					initialProps,
					initialState: store.get()
				});

				res.end(html);
			})
			.catch(e => console.log(e));
	});

/**
 * Start the server
 */
server.listen(3000, () => {
	console.log(`Running @ http://localhost:3000`);
});
