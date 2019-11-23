export default () =>
	typeof window !== "undefined" &&
	window.__SSR_DATA__ &&
	window.__SSR_DATA__.initialState
		? window.__SSR_DATA__.initialState
		: false;
