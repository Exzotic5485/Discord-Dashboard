# Client Credentials <Badge type="warning" text="REQUIRED" />

In order for users to be able to log in with OAuth2 (using Discord) to your Dashboard, you need to allow them to do so (in general, I know)!

Discord allows you to set up an OAuth2 client very easily. All you need to do is go to the Discord Developer Panel and enter the client, which is your bot.

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setClientCredentials({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    })
    ...
```

## How to get it?

Go the OAuth2 tab and copy the Client ID and Client Secret values.

![Discord Dev Credentials](/images/discord_dev_credentials.png)
