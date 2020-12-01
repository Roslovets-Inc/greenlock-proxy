# Greenlock Proxy Wrapper

Automatically get free SSL certificates from [Let’s Encrypt](https://letsencrypt.org/) and serve your sites over HTTPS.

## Features

- Automatically get **free** SSL sertificate from Let's Encrypt
- Easily redirect requests for your domain to any internal address (like server on any port)
- Distribute incoming traffic across several servers with built-in balancer

Based on [greenlock-express](https://github.com/coolaj86/greenlock-express).

## How to Install

```bash
npm i greenlock-proxy
```

## Example

```js
const GreenlockProxy = require('greenlock-proxy');

// Configure Let's Encrypt settings to get SSL certificate
var proxy = new GreenlockProxy({
    maintainerEmail: "example@email.com", // your email
    staging: true // true for testing, false for production (only after testing!)
});

// Just bind your domain to internal address - common example
proxy.register(["dev.example.com", "www.dev.example.com"], ["http://localhost:4200"]);

// Optional: bind another domain to another address
proxy.register(["example.com", "www.example.com"], ["http://localhost:80"]);

// Optional: simple random balancer
proxy.register(["balancer.example.com", "www.balancer.example.com"], ["http://localhost:81","http://localhost:82","http://localhost:83"]);

// Start proxiyng
proxy.start();
```
