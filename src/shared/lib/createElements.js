export default tags => tags.map(tag => {
  const el = createElement(tag.name)

  if (tag.attrs) {
    for (const [attr, val] of tag.attrs) {
      el.setAttribute(attr, val)
    }
  }

  els.push(el)
})
