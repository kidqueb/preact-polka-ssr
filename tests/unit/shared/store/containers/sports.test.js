import createStore from '~/shared/store/index'
import { sports, addSport, deleteSport, setActiveIndex } from '~/shared/store/containers/sports'

describe('shared/store/containers/sports', () => {
  let store, state, expectedState

  beforeEach(() => {
    store = createStore()
    state = store.getState()

    expectedState = {
      list: ['football', 'baseball'],
      activeIndex: 0
    }
  })

  it('exports an initial state', () => {
    expect(sports).toEqual(expectedState)
  })

  it('store is created with its iniital state', () => {
    expect(state.sports).toEqual(sports)
  })

  describe('addSport action', () => {
    it('appends a sport to the list', () => {
      const expected = { list: ['football', 'baseball', 'test'] }
      expect(addSport(state.sports, 'test')).toEqual(expected)
    })
  })

  describe('deleteSport action', () => {
    it('removes a sport from the list', () => {
      const expected = { list: ['baseball'] }
      expect(deleteSport(state.sports, 'football')).toEqual(expected)
    })
  })

  describe('setActiveIndex action', () => {
    it('sets the active index ', () => {
      const expected = { activeIndex: 1 }
      expect(setActiveIndex(state.sports, 1)).toEqual(expected)
    })
  })
})
