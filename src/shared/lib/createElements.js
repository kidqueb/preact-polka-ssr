export default tags => {
  let els = [], i = 0, l = tags.length

  for (; i < l; i++) {
    const tag = tags[i]
    const el = createElement(tag.name)

    if (tag.attrs) {
      for (const [attr, val] of tag.attrs) {
        el.setAttribute(attr, val)
      }
    }

    els.push(el)
  }

  return els
}
