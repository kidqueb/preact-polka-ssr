/**
 * Extracted some ugly code to grab `initialState` that was passed down
 * from the server so we don't have to duplicate any requests that were
 * made from a route's `getInitialProps` method.
 */
export default () =>
	typeof window !== "undefined" &&
	window.__SSR_DATA__ &&
	window.__SSR_DATA__.initialState
		? window.__SSR_DATA__.initialState
		: false;
