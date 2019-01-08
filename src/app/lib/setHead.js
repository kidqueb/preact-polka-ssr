import createElements from '../../shared/lib/createElements'

export default head => {
  // Set the page title
  document.title = head.title || 'Default Title'

  // Other tags we need to append to the <head>
  const els = head.tags && head.tags.length ? createElements(head.tags) : []

  // Toss em in the dom
  if (els.length) document.getElementsByTagName('head')[0].appendChild(els.join())

  // Return a function that removes all the elements we added
  return () => unsetHead(els)
}

function unsetHead(tags) {
  let i = 0, l = tags.length

  for (; i < l; i++) {
    const tag = tags[i]
    tag.parentNode.removeChild(tag)
  }
}

function createOg(og) {
  const ogTags = [
    {
      name: 'meta',
      attrs: { property: 'og:url', content: og.url }
    }, {
      name: 'meta',
      attrs: { property: 'og:title', content: og.title }
    }, {
      name: 'meta',
      attrs: { property: 'og:description', content: og.description }
    }
  ]
}

// const Head = props => (
//   <NextHead>
//     <meta charSet="UTF-8" />
//     <title>{props.title || ''}</title>

//     <meta property="og:url" content={props.url || defaultOGURL} />
//     <meta property="og:title" content={props.title || ''} />
//     <meta property="og:description" content={props.description || defaultDescription} />
//     <meta name="twitter:site" content={props.url || defaultOGURL} />
//     <meta name="twitter:card" content="summary_large_image" />
//     <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
//     <meta property="og:image" content={props.ogImage || defaultOGImage} />
//     <meta property="og:image:width" content="1200" />
//     <meta property="og:image:height" content="630" />
//     <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,500|Fira+Mono:400,500" rel="stylesheet" />
//   </NextHead>
// )