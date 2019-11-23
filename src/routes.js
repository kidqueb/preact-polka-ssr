/* eslint-disable lines-around-comment */

/**
 * Async route functions
 */
const getFoods = () =>
	import(
		"./client/pages/Foods"
		/* webpackChunkName: "foods" */
		/* webpackPrefetch: true */
	);
const getSports = () =>
	import(
		"./client/pages/Sports"
		/* webpackChunkName: "sports" */
		/* webpackPrefetch: true */
	);
const getError = () =>
	import(
		"./client/pages/Error"
		/* webpackChunkName: "error" */
	);

/**
 * Route tree
 */
const routes = [
	{ path: "/", getComponent: getFoods },
	{ path: "/sports/:id/:segment?", getComponent: getSports },
	{ path: "/:error*", getComponent: getError }
];

export default routes;
