/* eslint-disable lines-around-comment */

/**
 * Async route functions
 */
const getFoods = () =>
	import(
		"./app/pages/Foods"
		/* webpackChunkName: "foods" */
	);
const getSports = () =>
	import(
		"./app/pages/Sports"
		/* webpackChunkName: "sports" */
	);
const getError = () =>
	import(
		"./app/pages/Error"
		/* webpackChunkName: "error" */
	);

/**
 * Route tree
 */
const routes = [
	{ path: "/", getComponent: getFoods },
	{ path: "/sports/:id", getComponent: getSports },
	{ path: "/:error*", getComponent: getError }
];

export default routes;
