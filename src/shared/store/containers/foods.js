export const foods = {
  list: ['banana', 'apple'],
  activeIndex: 0
}

export const addFood = (s, food) => {
  return set(s.foods, {
    list: [...foods.list, food]
  })
}

export const setActiveIndex = (s, activeIndex) => {
  return set(s.foods, { activeIndex })
}

// Merge this individual containers state
function set(last, next) {
  return { foods: { ...last, ...next } }
}
