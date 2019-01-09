import createStore from '~/shared/store/index'
import { foods, addFood, deleteFood, setActiveIndex } from '~/shared/store/containers/foods'

describe('shared/store/containers/foods', () => {
  let store, state, expectedState

  beforeEach(() => {
    store = createStore()
    state = store.getState()

    expectedState = {
      list: ['banana', 'apple'],
      activeIndex: 0
    }
  })

  it('exports an initial state', () => {
    expect(foods).toEqual(expectedState)
  })

  it('store is created with its iniital state', () => {
    expect(state.foods).toEqual(foods)
  })

  describe('addFood action', () => {
    it('appends a food to the list', () => {
      const expected = { list: ['banana', 'apple', 'test'] }
      expect(addFood(state.foods, 'test')).toEqual(expected)
    })
  })

  describe('deleteFood action', () => {
    it('removes a food from the list', () => {
      const expected = { list: ['apple'] }
      expect(deleteFood(state.foods, 'banana')).toEqual(expected)
    })
  })

  describe('setActiveIndex action', () => {
    it('sets the active index ', () => {
      const expected = { activeIndex: 1 }
      expect(setActiveIndex(state.foods, 1)).toEqual(expected)
    })
  })
})
