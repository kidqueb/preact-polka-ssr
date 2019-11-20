import { h, hydrate } from "preact";
import useLocation from 'wouter-preact/use-location';

import "./styles/app.scss";
import App from "./components/App";

// Hydrate the app
if (typeof window !== undefined) {
	const container = document.body;
	hydrate(<App hook={useLocation} />, container, container.firstChild);
}
