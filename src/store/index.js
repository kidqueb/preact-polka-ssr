import createStore from "storeon";

import foods from "./containers/foods";

// Initialize devtools only if it's in the browser and in dev.
const devTools =
	typeof window !== "undefined" &&
	process.env.NODE_ENV === "development" &&
	require("storeon/devtools");

// Export a function that creates a fresh new store object.
export default () => createStore([
	foods, 
	devTools // dev only
]);
