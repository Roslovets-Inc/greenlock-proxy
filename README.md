# Greenlock Proxy Wrapper

Automatically get free SSL certificates from [Let’s Encrypt](https://letsencrypt.org/) and serve your sites over HTTPS.

Based on [greenlock-express](https://github.com/coolaj86/greenlock-express).

## How to Install

```bash
npm i greenlock-proxy
```

## Example

```js
const GreenlockProxy = require('greenlock-proxy');

var proxy = new GreenlockProxy({
    maintainerEmail: "example@email.com",
    staging: true // true for testing, false for production
});

proxy.register(["dev.example.com", "www.dev.example.com"], "http://localhost:4200");
proxy.register(["example.com", "www.example.com"], "http://localhost:80");

proxy.start();
```
