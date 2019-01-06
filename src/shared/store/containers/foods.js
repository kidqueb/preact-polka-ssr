export const foods = {
  list: ['banana', 'apple'],
  activeIndex: 0
}

export const addFood = ({ list }, food) => {
  return { list: [...list, food] }
}

export const deleteFood = ({ list }, food) => {
  list = list.filter(item => item !== food)
  return { list }
}

export const setActiveIndex = (_, activeIndex) => {
  return { activeIndex }
}

export default [addFood, deleteFood, setActiveIndex]
