# Port <Badge type="info" text="OPTIONAL" /> <Badge type="tip" text="DEFAULT 3000" />

Basically, the Dashboard starts on port 3000. To change this, use this simple function.

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setPort(process.env.PORT)
    ...
```
