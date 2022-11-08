# Development Mode <Badge type="warning" text="REQUIRED" />

The Discord-Dashboard operates in 2 modes: Development and Production. During Development mode, no statistics are sent and dev mode is used (Fastify uses a logger and Next.js has hot reload mode).

To define whether you want to use Development mode or not, define:

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    .setDev(true/false)
    ...
```
