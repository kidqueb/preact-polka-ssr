export const foods = {
  list: ['banana', 'apple'],
  activeIndex: 0
}

export function addFood({ list }, food) {
  return { list: [...list, food] }
}

export function deleteFood({ list }, food) {
  list = list.filter(item => item !== food)
  return { list }
}

export function setActiveIndex(_, activeIndex) {
  return { activeIndex }
}

export default [addFood, deleteFood, setActiveIndex]
