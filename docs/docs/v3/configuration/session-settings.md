# Session Settings <Badge type="info" text="OPTIONAL" />

By default, the user session will be retained until the project is restarted. And nobody wants that. That's why it's worth changing this setting, even though it's optional.

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setSession({
        secret: process.env.SESSION_SECRET,
        expires: 1000 * 60 * 60 * 24 * 7,
        saveUninitialized: false,
        secure: false,
        store: (session) => {
            const FileStore = require('session-file-store')(session)
            return new FileStore({})
        },
    })
    ...
```

- `secret: string` - Text of a minimum length of 32 characters that should not be changed; changing it indicates a session error and reset,
- `expires: number` - Length (in milliseconds) of one session lifetime,
- `saveUninitialized: boolean` -  When an empty session object is created and no properties are set, it is the uninitialized state,
- `secure: boolean` - Whether session cookies should be secure; Using **http = false**; Using **https = true**.
- `store: (session)=>SessionStore` - The function that should return the SessionStore; compatible to stores from **express-session** and **@fastify/session**.
