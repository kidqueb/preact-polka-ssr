export const sports = {
  list: ['football', 'baseball'],
  activeIndex: 0
}

export const addSport = ({ list }, sport) => {
  return { list: [...list, sport] }
}

export const deleteSport = ({ list }, sport) => {
  list = list.filter(item => item !== sport)
  return { list }
}

export const setActiveIndex = (_, activeIndex) => {
  return { activeIndex }
}

export default [addSport, deleteSport, setActiveIndex]
