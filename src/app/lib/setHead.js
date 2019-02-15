import createElements from '../../shared/lib/createElements';

export default head => {
  // Set the page title
  document.title = head.title || 'Default Title';

  // Other tags we need to append to the <head>
  const els = head.tags && head.tags.length ? createElements(head.tags) : [];

  // Toss em in the dom
  if (els.length) document.getElementsByTagName('head')[0].appendChild(els.join());

  // Return a function that removes all the elements we added
  return () => unsetHead(els);
};

function unsetHead(tags) {
  let i = 0, l = tags.length, tag;

  for (; i < l; i++) {
    tag = tags[i];
    tag.parentNode.removeChild(tag);
  }
}

// function createOg(og) {
//   const ogTags = [
//     {
//       name: 'meta',
//       attrs: { property: 'og:url', content: og.url }
//     }, {
//       name: 'meta',
//       attrs: { property: 'og:title', content: og.title }
//     }, {
//       name: 'meta',
//       attrs: { property: 'og:description', content: og.description }
//     }
//   ]
// }
