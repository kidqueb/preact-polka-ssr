# Preact/Polka SSR
Major work in progress. Definitely hit me up on [twitter (@kidqueb)](https://twitter.com/kidqueb) if you have any suggestions or questions.

## Implemented
* Isomorphic `preact` app (and it's async routes) served by `polka`.
* Component's can use a static `getInitialProps` method to retrieve data.
* Service worker using `workbox-webpack-plugin` (production only).

## Upcoming Additions
* Wire up `unistore`
* Manage `<head>` on a per page basis
* SSR cache
* Authentication logic
* Definitely need to get some tests in
* Determine if `react-router` is worth the kb
* CSS (SCSS) modules?

## Todo Laters
* [ ] `preact-router` utils should just be exposed through a fork instead of all that duplicate code.
* [ ] Make a decision on how to handle errors for 404s and whatnot.

## Setting Up Local SSL
On Chrome you can enable local ssl at [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost)
```
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout _config/ssl/local.key -out _config/ssl/local.crt
```
