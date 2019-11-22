export const DEFAULT_STATE = {
	activeIndex: null,
	list: ["apple", "orange", "banana"]
};

export const FoodsActions = {
	SET_ACTIVE_INDEX: "foods/SET_ACTIVE_INDEX",
	SET_LIST: "foods/SET_LIST"
};

export default store => {
	store.on("@init", () => {
		const foods = DEFAULT_STATE;
		return { foods };
	});

	store.on(FoodsActions.SET_ACTIVE_INDEX, (store, activeIndex) => {
    const foods = { ...store.foods, activeIndex }
		return { foods };
	});

	store.on(FoodsActions.SET_LIST, (store, list) => {
    const foods = { ...store.foods, list }
		return { foods };
	});
};
