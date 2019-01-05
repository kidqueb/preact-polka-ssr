export const foods = {
  list: ['banana', 'apple'],
  activeIndex: 0
}

export const addFood = (s, food) => {
  return { list: [...s.list, food] }
}

export const setActiveIndex = (_, activeIndex) => {
  return { activeIndex }
}
