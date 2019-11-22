export default tags =>
  tags.map(tag => {
    let el = document.createElement(tag.name);

    if (tag.attrs) {
      for (const key in tag.attrs) {
        if (tag.attrs.hasOwnProperty(key)) {
          el.setAttribute(key, tag.attrs[key]);
        }
      }
    }

    return el;
  });
