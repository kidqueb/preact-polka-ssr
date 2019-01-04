# Preact/Polka SSR
Major work in progress. Definitely hit me up on [twitter (@kidqueb)](https://twitter.com/kidqueb) if you have any suggestions or questions.

## Upcoming Additions/Known Fixes
* Use GitHub instead of this readme to manage "Upcoming Additions/Known Fixes" ;)
* Wire up `unistore`
* Manage `<head>` on a per page basis
* SSR cache
* Authentication logic
* Definitely need to get some tests in

## Todo Laters
* [ ] `preact-router` utils should just be exposed through a fork instead of all that duplicate code.

## Local SSL
On Chrome you can enable local ssl at [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost)
```
$ mkdir _config/ssl
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout _config/ssl/local.key -out _config/ssl/local.crt
```
