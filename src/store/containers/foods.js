import getInitialState from "../_getInitialState"
import bindContainer from "../_bindContainer"

/**
 * Get the initial state from server data if present, otherwhite
 * initialize a new store object with unmodified default state.
 */
export const initialState = getInitialState()["foods"] || {
	activeIndex: 0,
	list: ["apple", "orange", "banana"]
};

export const FoodsActions = {
	SET_ACTIVE_INDEX: "foods/SET_ACTIVE_INDEX",
	SET_LIST: "foods/SET_LIST"
};

export default store => {
	const onContainer = bindContainer("foods", store)

	store.on("@init", () => {
		return { foods: initialState }
	});

	onContainer(FoodsActions.SET_ACTIVE_INDEX, (state, activeIndex) => {
		return { activeIndex };
	});

	onContainer(FoodsActions.SET_LIST, (state, list) => {
		return { list };
	});
};
