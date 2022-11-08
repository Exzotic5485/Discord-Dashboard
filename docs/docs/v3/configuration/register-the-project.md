# Register the Project <Badge type="warning" text="REQUIRED" />

Once you have your [Project Discord Dashboard instance](/v3/creating-project-instance), it is now time to link your project and account to the Discord-Dashboard project.

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .registerProject({
        accountToken: process.env.ASSISTANTS_SERVICES_ACCOUNT_TOKEN,
        projectId: process.env.DISCORD_DASHBOARD_PROJECT_ID,
    })
    ...
```

## Account Token

Go to [ACS Account Management Page](https://assistantscenter.com/profile) and generate an Account Token for yourself.

Your token is used to identify you between our server and your project. With this, you can use all Addons you've bought and enjoy the benefits of Discord-Dashboard Premium (if you have it).

<Badge type="tip" text="RELEVANT" /> Your token is only visible once it has been generated. Every time you forget it or lose it, you have to reset it.

![ACS Profile Token](/images/acs_profile_token.png)

## Project ID

Your project ID is the ID of the project created [in this step](/v3/creating-project-instance).
