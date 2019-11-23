import { h } from "preact";
import fs from "fs";
import polka from "polka";
import sirv from "sirv";
import compression from "compression";
import useStaticLocation from "wouter-preact/static-location";
import renderToString from "preact-render-to-string";

import createStore from "../store"
import asyncPrep from "./lib/asyncPrep";
import renderDocument from "./lib/renderDocument";
import App from "../app/components/App";

const isDev = process.env.NODE_ENV === "development";

/**
 * Create Polka handler, register middleware & routes
 */
const server = polka()
	.use(compression())
	.use(sirv("dist"))
	.get("*", (req, res, next) => {
		const store = createStore()
		const assets = JSON.parse(fs.readFileSync("./dist/manifest.json", "utf8"));

		// Wait for `loadInitialProps` and `ensureReady` to resolve,
		// then render <App /> with the `initialProps` and <Component />
		asyncPrep(req, store)
			.then(asyncPayload => {
				if (!asyncPayload) return next();
				const { CurrentRoute, params, initialProps } = asyncPayload;

				const AppWithCurrentRoute = () => (
					<App hook={useStaticLocation(req.url)} store={store}>
						<CurrentRoute {...({req, params, ...initialProps})} />
					</App>
				);

				// Render our app
				const app = renderToString(<AppWithCurrentRoute />);

				// Render our html template
				const html = renderDocument({ 
					app, 
					assets, 
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
isDev ? runDev() : runProd();

function runDev() {
	server.listen(3000, () => {
		console.log(`Running @ http://localhost:3000`);
	});
}

function runProd() {
	server.listen(3000, () => {
		console.log(`Running @ http://localhost:3000`);
	});
}
