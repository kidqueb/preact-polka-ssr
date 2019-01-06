import { h } from 'preact'

const Head = ({ assets }) => {
  return (
    <head>
      <title>Project Title</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
      <link rel="manifest" href="/assets/site.webmanifest" />
      <link rel="stylesheet" type="text/css" href={assets['app.css']} />
    </head>
  )
}

export default Head
