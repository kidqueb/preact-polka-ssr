export const sports = {
  list: ['football', 'baseball'],
  activeIndex: 0
}

export function addSport({ list }, sport) {
  return { list: [...list, sport] }
}

export function deleteSport({ list }, sport) {
  list = list.filter(item => item !== sport)
  return { list }
}

export function setActiveIndex(_, activeIndex){
  return { activeIndex }
}

export default [addSport, deleteSport, setActiveIndex]
