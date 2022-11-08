# Discord.js Client <Badge type="warning" text="REQUIRED" />

Discord-Dashboard requires a Discord.js client to be given to it in order to start working. We use it to verify a user's permissions, to verify that they are definitely on a server, and to retrieve roles and channels from servers.

Supported versions of Discord.js are v13 and v14. The intents you should use are Guilds.

```js
// D.JS CLIENT
const { Client, GatewayIntentBits, Partials } = require('discord.js')
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
})

client.login(process.env.BOT_TOKEN)

// DASHBOARD
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setClientCredentials({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    })
    ...
```
