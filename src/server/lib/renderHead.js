import { h } from 'preact';

export default ({ assets }) => `
  <head>
    <meta charset="UTF-8">
    <title>${'Default Title'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A preact app with ssr served by polka.">
    <meta name="theme-color" content="#333"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
    <link rel="manifest" href="/assets/site.webmanifest">
    <link rel="stylesheet" type="text/css" href=${assets['app.css']} />
  </head>
`;
