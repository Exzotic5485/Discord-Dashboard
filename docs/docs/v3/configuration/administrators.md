# Administrators <Badge type="info" text="OPTIONAL" />

Admins should be the ID list of Discord users. Sometimes, e.g. when using maintenance mode, only the admin has access to all/part of the Dashboard. This is when we retrieve these IDs.
```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setAdministrators([
        '778685361014046780',
    ])
    ...
```
