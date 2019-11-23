import createStore from "~/store";
import foods, { FoodsActions } from "~/store/containers/foods";

describe("store container > foods", () => {
	let store, state, expectedState;

	beforeEach(() => {
		store = createStore();
		state = store.getState();

		expectedState = {
			activeIndex: 0,
			list: ["apple", "orange", "banana"]
		};
	});

	it("exports an initial state", () => {
		expect(foods).toEqual(expectedState);
	});

	it("store is created with its iniital state", () => {
		expect(state.foods).toEqual(foods);
	});

	describe("addFood action", () => {
		it("appends a food to the list", () => {
			const expected = { list: ["banana", "apple", "test"] };
			expect(addFood(state.foods, "test")).toEqual(expected);
		});
	});
});
