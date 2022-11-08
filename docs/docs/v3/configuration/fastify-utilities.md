# Fastify Utilities <Badge type="info" text="OPTIONAL" />

Do you want to hook up any modules to Fastify, which the Discord-Dashboard runs on? Add them here!

```js
const { Dashboard } = require('discord-dashboard')
const helmet = require('@fastify/helmet')

new Dashboard(/*ENGINE*/)
    ...
    .setFastifyUtilities([
        [helmet, { contentSecurityPolicy: false, global: true }],
    ])
    ...
```
