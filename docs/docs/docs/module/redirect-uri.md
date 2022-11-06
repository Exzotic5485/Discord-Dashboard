# Redirect URI <Badge type="warning" text="REQUIRED" />

Most of you are lecturing here. And wrongly so, because it's nothing terrible. We will try to explain the subject as best we can. And if we fail, join our [Support Server](https://discord.gg/6Yv5U9V3ux) and ask for help!

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setRedirectURI('http://localhost:3000/api/auth/callback')
    ...
```

## What is it?


The redirect URI is the link to which the user with the OAuth2 access code will be redirected.

Sounds hard what? Well no! Discord-Dashboard has already created this system for you, and you only have to ... enter one URL here and add it to the trusted list in the Discord Dev Panel.

## Hold up, what's this URL?

This url is nothing more than a combination of 4 things: web protocol, domain (or localhost), port (or not, it depends too) and endpoint which is always the same.

We have prepared a special algorithm for you in Paint to navigate this process.

![Redirect URI Algorithm](/images/redirecturi_algorithm.png)

## Add this to your trusted URIs' list

Don't forget to add the fixed Redirect URI to the Trust List in Discord Developer Panel!

![Discord Dev Trusted URIs](/images/discord_dev_trusted_uris.png)
