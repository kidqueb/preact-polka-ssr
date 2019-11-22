import createStore from "storeon";
import foods from "./containers/foods";

const devTools =
	(process.env.NODE_ENV === "development" && typeof window !== undefined) &&
	require("storeon/devtools");

const store = () => createStore([foods]);

export default store;
