# Greenlock Proxy Wrapper

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